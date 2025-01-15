<template>
  <div class="part_container fr-mb-6w">
    <h2 id="IX.-Databox">
      IX. Databox
    </h2>
    <p>
      Le composant DataBox est un composant polyvalent qui permet d'afficher des données sous différentes formes, notamment des indicateurs, des graphiques, des tableaux, etc. Il intègre également des fonctionnalités interactives telles que des sélecteurs de sources, des modales, et des menus déroulants pour des actions supplémentaires.
    </p>
    <div class="chart_container">
      <h3 class="fr-h6 fr-text--bold fr-mb-0">
        Évolution du nombre de naissances et du taux de natalité
      </h3>
      <p class="fr-text--sm">
        France hors Mayotte, naissances en milliers et taux de natalité pour mille femmes. Insee, 16/01/2024
      </p>
      <DataBox
        id="def"
        title="Statut des emplois en France en 2018"
        tooltip-title="Statut des emplois en France"
        tooltip-content="Pour l'année 2018. France hors Mayotte, population des ménages, personnes en emploi."
        source="Insee, enquête Emploi"
        date="04/11/2024"
        segmented-control="true"
        screenshot="false"
        download="false"
        fullscreen="false"
      />
      <!-- Div to allow create the element to teleport to -->
      <div
        databox-id="def"
        databox-type="chart"
      />
      <PieChart
        databox-id="def"
        databox-type="chart"
        v-bind="chartData.pieChart.doughnut"
      />
    </div>
  </div>
</template>

<script setup>
import { chartData } from '@/assets/data';
import DataBox from '../DataBox.vue';
import PieChart from '../PieChart.vue';
</script>
