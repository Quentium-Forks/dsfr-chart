<template>
  <div class="fr-card fr-card--shadow databox">
    <!-- Header -->
    <div class="fr-p-2w databox__head">
      <h3 class="fr-h6 fr-mb-0">
        {title}
      </h3>
      <div class="flex">
        <button
          class="fr-btn--tooltip fr-btn"
          type="button"
          aria-describedby="tooltip-tooltipId"
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
            {tooltipTitle}
          </p>
          <p class="fr-text--xs fr-mb-0">
            {tooltipContent}
          </p>
        </div>

        <nav
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
                <li>
                  <button
                    class="fr-translate__language fr-nav__link"
                    aria-current="true"
                  >
                    Capture d'écran
                  </button>
                </li>
                <li>
                  <button class="fr-translate__language fr-nav__link">
                    Télécharger CSV
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
        v-if="selectedView === 'table'"
        id="databoxId-table"
      >
        { Table }
      </div>
    </div>

    <!-- Footer -->
    <div class="fr-p-2w databox__foot">
      <p class="fr-text--xs fr-mb-0">
        {source}
      </p>
      <fieldset class="fr-segmented fr-segmented--no-legend fr-segmented--sm">
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
/*
    Expected props
    - title
    - tooltipId
    - tooltipTitle
    - tooltipContent
    - dropdownId
    - databoxId
    - data
    - source
    - segmentedControlId
*/

import { ref } from 'vue';

// État pour suivre la vue sélectionnée (par défaut : 'chart')
const selectedView = ref('chart');

// Fonction pour changer de vue
const changeView = (view) => {
  selectedView.value = view;
};
</script>

<style scoped>
.databox__head,
.databox__foot {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
}

.databox__content {
  align-items: center;
  display: flex;
  flex-direction: column;
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
