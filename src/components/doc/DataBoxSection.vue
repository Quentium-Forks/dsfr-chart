<template>
  <div class="part_container">
    <h2 id="Databox">
      Databox
    </h2>
    <h3>Présentation</h3>
    <p>Le composant <strong>DataBox</strong> est un composant permettant d’afficher dans un cadre normé des données sous différentes formes (graphiques, chiffres clés, tableaux, etc). Il est à utiliser pour composer un tableau de bord, ou toute page nécessitant de structurer la visualisation de données.</p>
    <p>Polyvalente, la databox intègre également des fonctionnalités interactives telles que des sélecteurs de sources, des modales, et des menus déroulants permettant la mise à disposition d’actions supplémentaires.</p>

    <h3>Structure</h3>
    <p>La databox est composée des éléments suivants :</p>
    <ul>
      <li><strong>un titre</strong> (obligatoire)</li>
      <li>une infobulle permettant de préciser la donnée affichée (optionnelle)</li>
      <li>un bouton permettant l’affichage d’une modale en plein écran (optionnel)</li>
      <li>un menu à points permettant l’affichage d’actions supplémentaires (optionnel)</li>
      <li>un indicateur de tendance (optionnel)</li>
      <li><strong>la donnée principale : chiffre, graphique ou tableau</strong> (obligatoire)</li>
      <li><strong>une source</strong> (obligatoire)</li>
      <li><strong>une date de mise à jour de la donnée</strong> (obligatoire)</li>
      <li><strong>un contrôle segmenté pour afficher la donnée en vue tableau</strong> (obligatoire lorsqu'un graphique est affiché)</li>
    </ul>

    <div class="chart_container fr-my-6w">
      <h3 id="Databox-simple">
        Databox simple
      </h3>
      <hr>
      <data-box v-bind="chartData.dataBox.simple" />
      <pie-chart
        databox-id="simple"
        databox-type="chart"
        v-bind="chartData.pieChart.doughnut"
      />
      <table-chart
        databox-id="simple"
        databox-type="table"
        :x="tableParse(chartData.pieChart.doughnut.x)"
        :y="chartData.pieChart.doughnut.y"
        name="[&quot;Pourcentage&quot;]"
        table-name="Catégories"
      />
      <CodeBlock
        :component="[{name: 'data-box'}, {name: 'pie-chart'}, {name: 'table-chart'}]"
        :attributes="[
          chartData.dataBox.simple,
          {dataBoxId: 'simple', dataBoxType: 'chart', ...chartData.pieChart.doughnut},
          {dataBoxId: 'simple', dataBoxType: 'table', x: tableParse(chartData.pieChart.doughnut.x), y: chartData.pieChart.doughnut.y, name: '[&quot;Pourcentage&quot;]', tableName: 'Catégories'}
        ]"
      />
    </div>

    <div class="chart_container fr-my-6w">
      <h3 id="Databox-complète-multi-source">
        Databox complète multi source
      </h3>
      <hr>
      <data-box v-bind="chartData.dataBox.complete" />
      <scatter-chart
        databox-id="complete"
        databox-type="chart"
        databox-source="insee"
        v-bind="chartData.scatterChart.linked"
        :y="defaultScatterData"
      />
      <scatter-chart
        databox-id="complete"
        databox-type="chart"
        databox-source="pole-emploi"
        v-bind="chartData.scatterChart.linked"
        :y="sortedScatterData"
      />
      <scatter-chart
        databox-id="complete"
        databox-type="chart"
        databox-source="autre"
        v-bind="chartData.scatterChart.linked"
        :y="reversedScatterData"
      />
      <table-chart
        databox-id="complete"
        databox-type="table"
        databox-source="insee"
        :x="tableParse(chartData.scatterChart.linked.x)"
        :y="defaultScatterData"
        :name="chartData.scatterChart.linked.name"
        table-name="Années INSEE"
      />
      <table-chart
        databox-id="complete"
        databox-type="table"
        :x="tableParse(chartData.scatterChart.linked.x)"
        :y="reversedScatterData"
        :name="chartData.scatterChart.linked.name"
        table-name="Années"
      />
      <CodeBlock
        :component="[{name: 'data-box'}, {name: 'scatter-chart'}, {name: 'scatter-chart'}, {name: 'scatter-chart'}, {name: 'table-chart'}, {name: 'table-chart'}]"
        :attributes="[
          chartData.dataBox.complete,
          {dataBoxId: 'complete', dataBoxType: 'chart', dataBoxSource: 'insee', ...chartData.scatterChart.linked, y: defaultScatterData },
          {dataBoxId: 'complete', dataBoxType: 'chart', dataBoxSource: 'pole-emploi', ...chartData.scatterChart.linked, y: sortedScatterData },
          {dataBoxId: 'complete', dataBoxType: 'chart', dataBoxSource: 'autre', ...chartData.scatterChart.linked, y: reversedScatterData },
          {dataBoxId: 'complete', dataBoxType: 'table', x: tableParse(chartData.scatterChart.linked.x), y: defaultScatterData, name: chartData.scatterChart.linked.name, tableName: 'Années INSEE'},
          {dataBoxId: 'complete', dataBoxType: 'table', x: tableParse(chartData.scatterChart.linked.x), y: reversedScatterData, name: chartData.scatterChart.linked.name, tableName: 'Années'}]"
      />
    </div>

    <h3>Occupation de l'espace</h3>
    <p>Le menu à points peut contenir toutes les actions dont vous avez besoin pour votre projet.</p>
    <p>La librairie DSFR Chart propose une fonctionnalité d’export CSC des données et de téléchargement de capture d'écran, mais elles ne doivent pas figurer obligatoirement si vous n’en avez pas le besoin.</p>
  </div>
</template>

<script setup>
import { chartData } from '@/assets/data';
import CodeBlock from './CodeBlock.vue';

const scatterData = JSON.parse(chartData.scatterChart.linked.y);

const defaultScatterData = JSON.stringify(scatterData);
const sortedScatterData = JSON.stringify(scatterData.map((arr) => arr.sort((a, b) => a - b)));
const reversedScatterData = JSON.stringify(scatterData.map((arr) => arr.reverse()));

const tableParse = (data) => JSON.stringify(JSON.parse(data)[0]);
</script>
