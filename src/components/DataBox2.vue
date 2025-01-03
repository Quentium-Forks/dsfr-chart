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
          aria-describedby="tooltip-tooltipId"
          title="Informations complémentaires sur le graphique"
        >
          Informations complémentaires sur le graphique
        </button>

        <div
          id="tooltip-tooltipId"
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
              aria-controls="translate-dropdownId"
              aria-expanded="false"
              title="Plus d'actions"
            />
            <div
              id="translate-dropdownId"
              class="fr-collapse fr-translate__menu fr-menu"
            >
              <ul class="fr-menu__list">
                <li v-if="screenshot">
                  <button
                    class="fr-translate__language fr-nav__link"
                    aria-current="true"
                  >
                    Capture d'écran
                  </button>
                </li>
                <li v-if="download">
                  <button
                    class="fr-translate__language fr-nav__link"
                    :aria-current="screenshot ? false : true"
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

    <!-- Source & tendency -->
    <div class="fr-p-2w databox__source">
      <div
        v-if="chartSources.length > 1"
        class="fr-select-group"
      >
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
              id="segmented-segmentedControlId-1"
              value="1"
              type="radio"
              checked
              name="segmented-segmentedControlId"
              @change="changeView('chart')"
            >
            <label
              class="fr-label"
              for="segmented-segmentedControlId-1"
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
              id="segmented-segmentedControlId-2"
              value="2"
              type="radio"
              name="segmented-segmentedControlId"
              @change="changeView('table')"
            >
            <label
              class="fr-label"
              for="segmented-segmentedControlId-2"
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
  defaultSource: {
    type: String,
    default: null,
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
</script>

<style scoped>
.databox__header,
.databox__source,
.databox__footer {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.databox__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
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
