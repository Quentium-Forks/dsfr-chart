<template>
  <div class="fr-card fr-card--shadow databox">
    <!-- Header -->
    <div class="fr-p-2w databox__header">
      <h3 class="fr-h6 fr-mb-0">
        {{ title }}
      </h3>

      <div class="flex">
        <!-- Tooltip -->
        <button
          class="fr-btn--tooltip fr-btn"
          type="button"
          :aria-describedby="'tooltip-' + id"
          title="Informations complémentaires sur le graphique"
        >
          Informations complémentaires sur le graphique
        </button>

        <div
          :id="'tooltip-' + id"
          class="fr-tooltip fr-placement"
          role="tooltip"
          aria-hidden="true"
        >
          <p class="fr-text--xs fr-mb-0 bold">
            {{ tooltipTitle }}
          </p>
          <p class="fr-text--xs fr-mb-0">
            {{ tooltipContent }}
          </p>
        </div>

        <!-- Modal -->
        <button
          v-if="fullscreen"
          type="button"
          class="fr-btn fr-btn--sm fr-icon-fullscreen-line fr-btn--tertiary-no-outline square"
          aria-controls="modal-modalId"
          title="Afficher la modale"
        />

        <!-- More actions -->
        <nav
          v-if="screenshot || download"
          role="navigation"
          class="fr-translate fr-nav"
        >
          <div class="fr-nav__item">
            <button
              class="fr-btn fr-btn--sm fr-icon-more-line fr-btn--tertiary-no-outline square"
              :aria-controls="'translate-' + id"
              aria-expanded="false"
              title="Plus d'actions"
            />
            <div
              :id="'translate-' + id"
              class="fr-collapse fr-translate__menu fr-menu"
            >
              <ul class="fr-menu__list">
                <li v-if="screenshot">
                  <button
                    class="fr-translate__language fr-nav__link"
                    title="Prendre une capture d'écran"
                    @click="screenshotChart()"
                  >
                    Capture d'écran
                  </button>
                </li>
                <li v-if="download">
                  <button
                    class="fr-translate__language fr-nav__link"
                    title="Télécharger les données en CSV"
                    @click="downloadCSV(selectedView)"
                  >
                    Télécharger en CSV
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="fr-p-2w databox__data">
      <!-- Source -->
      <div
        v-if="chartSources.length > 1"
        class="databox__source"
      >
        <div class="fr-select-group">
          <label
            class="fr-label fr-text--xs fr-mb-0"
            for="select"
          > 
            Choisir une source de données
          </label>

          <select
            id="select"
            v-model="currentSource"
            name="select"
            class="fr-select fr-mt-0"
          >
            <option
              v-for="option in generateOptions(chartSources)"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Tendency -->
      <div
        v-if="trend"
        class="databox__tendency"
      >
        <p
          v-if="trend.includes('-')"
          class="fr-text--xs fr-m-0"
        >
          En baisse
          <span
            class="fr-badge fr-badge--error fr-badge--no-icon fr-badge--sm fr-ml-1v"
            :aria-label="'Baisse de ' + trend.replace('-', '').trim()"
          >
            <span
              class="fr-pr-1v"
              aria-hidden="true"
            >↘ </span>
            {{ trend.replace('-', '').trim() }}
          </span>
        </p>
        <p
          v-else
          class="fr-text--xs fr-m-0"
        >
          En hausse
          <span
            class="fr-badge fr-badge--success fr-badge--no-icon fr-badge--sm fr-ml-1v"
            :aria-label="'Hausse de ' + trend.trim()"
          >
            <span
              class="fr-pr-1v"
              aria-hidden="true"
            >↗ </span>
            {{ trend.trim() }}
          </span>
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="fr-p-2w databox__content">
      <div
        :class="selectedView === 'table' ? 'fr-hidden' : 'w-full'"
        :aria-hidden="selectedView === 'chart'"
      >
        <!-- Bulk create all source divs for teleport -->
        <div
          v-for="(chartSource, i) in chartSources"
          :id="id + '-chart-' + chartSource"
          :key="i"
          :class="currentSource !== chartSource ? 'fr-hidden' : ''"
        />
      </div>
      <div
        :class="selectedView === 'chart' ? 'fr-hidden' : 'w-full'"
        :aria-hidden="selectedView === 'table'"
      >
        <!-- Bulk create all source divs for teleport -->
        <div
          v-for="(tableSource, i) in tableSources.filter((s) => s !== 'global')"
          :id="id + '-table-' + tableSource"
          :key="i"
          :class="currentSource !== tableSource ? 'fr-hidden' : ''"
        />
        <!-- Also create a global chart in case only one table is provided -->
        <div
          v-if="tableSources.includes('global')"
          :id="id + '-table-global'"
          :class="tableSources.includes(currentSource) ? 'fr-hidden' : ''"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="fr-p-2w databox__footer">
      <p class="fr-text--xs fr-mb-0">
        {{ source }}, {{ date }}
      </p>

      <fieldset
        v-if="segmentedControl"
        class="fr-segmented fr-segmented--no-legend fr-segmented--sm"
      >
        <legend class="fr-segmented__legend">
          Choisir votre vue
        </legend>
        <div class="fr-segmented__elements">
          <div class="fr-segmented__element">
            <input
              :id="'segmented-chart-' + id"
              value="1"
              type="radio"
              checked
              :name="'segmented-' + id"
              @change="changeView('chart')"
            >
            <label
              class="fr-label"
              :for="'segmented-chart-' + id"
            >
              <span
                class="fr-icon-pie-chart-2-fill fr-icon--sm"
                aria-hidden="true"
              />
              <span class="fr-sr-only">Vue graphique</span>
            </label>
          </div>
          <div class="fr-segmented__element">
            <input
              :id="'segmented-table-' + id"
              value="2"
              type="radio"
              :name="'segmented-' + id"
              @change="changeView('table')"
            >
            <label
              class="fr-label"
              :for="'segmented-table-' + id"
            >
              <span
                class="fr-icon-table-2 fr-icon fr-icon--sm"
                aria-hidden="true"
              />
              <span class="fr-sr-only">Vue tableau</span>
            </label>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tooltipTitle: {
    type: String,
    default: '',
  },
  tooltipContent: {
    type: String,
    default: '',
  },
  source: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  defaultSource: {
    type: String,
    default: null,
  },
  trend: {
    type: [String, Number],
    default: null,
  },
  segmentedControl: {
    type: [Boolean, String],
    default: true,
  },
  fullscreen: {
    type: [Boolean, String],
    default: false,
  },
  screenshot: {
    type: [Boolean, String],
    default: false,
  },
  download: {
    type: [Boolean, String],
    default: false,
  },
});

const chartSources = ref([]);
const tableSources = ref([]);

chartSources.value = [...document.querySelectorAll(`[databox-id="${props.id}"][databox-type="chart"]`)].map((el) => el.getAttribute('databox-source') || 'default');

tableSources.value = [...document.querySelectorAll(`[databox-id="${props.id}"][databox-type="table"]`)].map((el) => el.getAttribute('databox-source') || 'global');

const currentSource = ref(chartSources.value.includes(props.defaultSource) ? props.defaultSource : chartSources.value[0]);

const generateOptions = (source) => {
  return source.map((option) => ({
    label: option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, ' '),
    value: option,
  }));
};

// Cast props to boolean
const segmentedControl = ref([true, 'true', ''].includes(props.segmentedControl));
const fullscreen = ref([true, 'true', ''].includes(props.fullscreen));
const screenshot = ref([true, 'true', ''].includes(props.screenshot));
const download = ref([true, 'true', ''].includes(props.download));

const selectedView = ref('chart');

const changeView = (view) => {
  selectedView.value = view;
};

const downloadCSV = (mode) => {
  const dom = document.querySelector(`[databox-id="${props.id}"][databox-type="${mode}"][databox-source="${currentSource.value}"]`);
  const x = JSON.parse(dom.getAttribute('x'));
  const y = JSON.parse(dom.getAttribute('y'));
  const name = JSON.parse(dom.getAttribute('name'));
  const tableName = dom.getAttribute('table-name');

  let csv = [];
  if (mode === 'chart') {
    csv.push(',' + x[0].join(',') + '\n');

    y.forEach((y, i) => {
      csv.push(`${name[i]},${y.join(',')}\n`);
    });
  } else if (mode === 'table') {
    // For x as abscisse
    // csv.push(tableName + ',' + x.join(',') + '\n');

    // y.forEach((y, i) => {
    //   csv.push(`Série ${i + 1},${y.join(',')}\n`);
    // });

    // For series as abscisse
    csv.push(tableName + ',' + y.map((_, i) => `Série ${i + 1}`).join(',') + '\n');

    x.forEach((x, i) => {
      csv.push(`${x},${y.map((y) => y[i]).join(',')}\n`);
    });
  }

  const blob = new Blob(csv, { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = mode === 'chart' ? 'chart.csv' : 'table.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

const screenshotChart = () => {
  const chart = document.getElementById(`${props.id}-chart-${currentSource.value}`);
  const canvas = chart.querySelector('canvas');

  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'chart.png';
  a.click();
};
</script>

<style scoped>
.databox__header,
.databox__data,
.databox__footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.databox__tendency {
  margin: auto 0 0 auto;
}

.databox__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.fr-tooltip {
  max-width: 220px;
}

.flex {
  display: flex;
}

.w-full {
  width: 100%;
}

.bold {
  font-weight: bold;
}

.square {
  aspect-ratio: 1;
}
</style>
