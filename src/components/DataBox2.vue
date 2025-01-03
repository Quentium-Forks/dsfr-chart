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

    <!-- Content -->
    <div class="fr-p-2w databox__content">
      <div
        v-if="selectedView === 'chart'"
        id="databoxId-chart"
      >
        { Graphique }
      </div>
      <div
        v-else-if="selectedView === 'table'"
        id="databoxId-table"
      >
        { Table }
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
  }
});

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

.bold {
  font-weight: bold;
}

.square {
  aspect-ratio: 1;
}
</style>
