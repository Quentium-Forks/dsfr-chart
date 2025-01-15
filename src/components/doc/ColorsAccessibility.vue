<template>
  <!-- COLORS -->
  <div class="part_container fr-mb-6w">
    <h2 id="colors">
      X. Les couleurs
    </h2>
    <h3 class="fr-mt-5w">
      Graphiques unicolores
    </h3>
    <p>
      Une représentation graphique n’a pas toujours besoin d’être colorée. Lorsqu’il n’est pas nécessaire de
      différencier les formes par des couleurs,
      on affichera les graphes avec la couleur par défaut du DSFR pour les graphes unicolores :
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #5C68E5"
      /> <span
        class="color_dot"
        style="background-color: #5C68E5"
      />
    </div>
    <h3 class="fr-mt-5w">
      Graphiques catégoriels
    </h3>
    <p>
      Lorsque les formes du graphique doivent être différenciées par des couleurs mais que celles-ci ne sont pas
      porteuses de sens supplémentaire que la catégorisation,
      la palette catégorielle doit être utilisée :
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #5C68E5"
      /> <span
        class="color_dot"
        style="background-color: #5C68E5"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #82B5F2"
      /> <span
        class="color_dot"
        style="background-color: #699BD6"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #29598F"
      /> <span
        class="color_dot"
        style="background-color: #4878B1"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #31A7AE"
      /> <span
        class="color_dot"
        style="background-color: #00828A"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #81EEF5"
      /> <span
        class="color_dot"
        style="background-color: #51C1C8"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #B478F1"
      /> <span
        class="color_dot"
        style="background-color: #BC8AF2"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #CFB1F5"
      /> <span
        class="color_dot"
        style="background-color: #CFB1F5"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #CECECE"
      /> <span
        class="color_dot"
        style="background-color: #A4A4A4"
      />
    </div>
    <h3 class="fr-mt-5w">
      Graphiques séquentiels
    </h3>
    <h4>Palette séquentielle unicolore</h4>
    <p>
      Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs
      matérialisent une gradation, une palette séquentielle doit être utilisée.
      Il en existe deux versions à utiliser en fonction du besoin, En fonction du nombre de catégories, on
      appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant de la première couleur de
      cette échelle
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #DBDAFF"
      /> <span
        class="color_dot"
        style="background-color: #B8B9FF"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #00005F"
      /> <span
        class="color_dot"
        style="background-color: #3647CA"
      />
    </div>
    <h4 class="fr-mt-5w">
      Palette séquentielle divergente
    </h4>
    <p>
      Cette palette convient également pour matérialiser des échelles numériques mais qui intègrent des valeurs
      négatives, ou des plages comportant deux extrêmes avec une ligne de base au milieu.<br>
      Dans la mesure du possible, le nombre de catégories doit refléter cette divergence, à travers 3 ou 5
      catégories distinctes. <br>
      Dans le cas où le nombre de catégories devrait être supérieur à 5, on appliquera autant de valeurs de
      couleurs qu’il en existe dans un dégradé allant du vert vers le rouge en passant par le jaune.
      Un nombre impair doit toutefois être conservé pour marquer la valeur médiane.
    </p>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #298641"
      /> <span
        class="color_dot"
        style="background-color: #298641"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #79D289"
      /> <span
        class="color_dot"
        style="background-color: #449D57"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #EFB900"
      /> <span
        class="color_dot"
        style="background-color: #AF8800"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #FFA373"
      /> <span
        class="color_dot"
        style="background-color: #FFA373"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #E91719"
      /> <span
        class="color_dot"
        style="background-color: #E16834"
      />
    </div>
    <div class="flex fr-mt-3v">
      <span
        class="color_dot"
        style="background-color: #B1B1B1"
      /> <span
        class="color_dot"
        style="background-color: #808080"
      />
    </div>
  </div>

  <!-- Accessibilité -->
  <div class="part_container fr-mb-10w">
    <h2 id="accessibility">
      XI. Accessibilité
    </h2>
    <p>
      Pour permettre d'offrir une alternative à la visualisation des
      données et ainsi s'adapter tous les publics, il est possible
      d’accompagner les graphiques d’une présentation des résultats sous
      la forme de tableaux.
    </p>

    <div class="chart_container">
      <component
        :is="TableChart"
        v-bind="FAKE_DATA.tableChart.default"
      />
    </div>

    <CodeBlock
      :component="TableChart"
      :attributes="FAKE_DATA.tableChart.default"
    />
  </div>
</template>

<script setup>
import TableChart from '../TableChart.vue';
import CodeBlock from './CodeBlock.vue';
import { FAKE_DATA } from './fakeData';
</script>

<style scoped>
.color_dot {
    min-width: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    background-color: var(--blue-france-sun-113-625);
    display: inline-block;
    margin-top: 0rem;
    margin-left: 1rem;
}
</style>
