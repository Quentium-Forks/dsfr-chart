<template>
  <div class="part_container">
    <h2 id="Couleurs">Gestion des couleurs</h2>
    <p>Un graphique étant par définition une représentation visuelle d’un ensemble de données, la couleur est un paramètre avec lequel il est possible de jouer pour en améliorer la compréhension et la perception. Une utilisation appropriée des couleurs est par conséquent essentielle pour réussir vos graphiques.</p>
    <p>Dans DSFR Chart, le paramètre <strong>palette-type</strong> vous permet de choisir un type de palette et <strong>palette-colors</strong> vous permet de personnaliser les couleurs utilisées par cette palette. Choisissez parmi les options disponibles pour représenter vos données de manière appropriée :</p>
    <ul>
      <li><code>categorical</code> : Palette catégorielle par défaut.</li>
      <li><code>unicolor</code> : Palette unicolore.</li>
      <li><code>gradient</code> : Palette dégradée.</li>
    </ul>
    <p>Puis personnalisez si besoin, les couleurs utilisées par la palette choisie avec les noms des couleurs DSFR 2 :</p>
    <ul>
      <li><code>['cacao', 'coquelicot', 'caramel', 'citron']</code> pour avoir une palette catégorielle sur un ton automne.</li>
      <li><code>'lagon'</code> pour une représentation unicolore en cyan.</li>
      <li><code>['guimauve', 'lavande']</code> pour une palette dégradée du rose vers le violet.</li>
      <li><code>['sapin', 'citron', 'coquelicot']</code> pour une palette dégradée divergente.</li>
    </ul>

    <h3>Graphiques catégoriels (par défaut)</h3>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs mais que celles-ci ne sont pas porteuses de sens supplémentaire que la catégorisation, la palette catégorielle doit être utilisée avec la valeur <code>categorical</code> (non obligatoire car par défaut).</p>
    <p>Il est conseillé de ne pas représenter plus de 8 catégories, car cela nuirait à la compréhension de l’utilisateur. Au-delà de ce nombre, il conviendra de rassembler les dernières catégories dans un ensemble “Autres”.</p>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-6v">
      <div
        v-for="color in Object.keys(COLORS_DSFR_V2.light)"
        :key="color"
        class="fr-col-6 fr-col-md-4"
      >
        <ColorCard
          :title="color"
          :color="COLORS_DSFR_V2.light[color].bg"
        />
      </div>
    </div>

    <h3>Graphiques unicolores</h3>
    <p>Une représentation graphique n’a pas toujours besoin d’être très colorée. Lorsqu’il n’est pas nécessaire de différencier les formes par des couleurs, on peut afficher les graphiques avec une couleur unie avec la valeur <code>unicolor</code>.</p>
    <p>Si aucune couleur n’est renseignée via l’attribut <code>palette-colors</code>, la couleur par défaut est la suivante :</p>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-6v">
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Couleur par défaut"
          :color="COLORS_DSFR_V2.light.saphir.bg"
        />
      </div>
    </div>

    <h3>Graphiques dégradés</h3>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette dégradée doit être utilisée avec la valeur <code>gradient</code>. Les possibilités sont multiples en fonction du type de données que vous souhaitez représenter.</p>
    <p>Si aucune couleur n’est renseignée via l’attribut <code>palette-colors</code>, le dégradé par défaut est le suivant :</p>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-6v">
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Couleur de départ"
          :color="COLORS_DSFR_V2.light.saphir.bg"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Couleur d’arrivée"
          :color="COLORS_DSFR_V2.light.saphir.text"
        />
      </div>
    </div>

    <h4>Palette dégradée unicolore</h4>
    <p>Lorsque les formes du graphique doivent être différenciées par des couleurs et que ces couleurs matérialisent une gradation, une palette séquentielle dégradée peut être utilisée.</p>
    <p>En fonction du nombre de catégories, il y aura autant de valeurs de couleurs générées qu’il en existe dans un dégradé allant de la couleur de départ à la couleur d’arrivée.</p>
    <p>Par exemple, si l’on souhaite utiliser un dégradé du rose vers le violet, l’attribut <code>palette-colors</code> pourra être renseigné de la manière suivante : <code>['guimauve', 'lavande']</code>.</p>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-6v">
      <div class="fr-col-6 fr-col-md-4">
        <ColorCard
          title="Couleur de départ"
          :color="COLORS_DSFR_V2.light.guimauve.bg"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Couleur d’arrivée"
          :color="COLORS_DSFR_V2.light.lavande.bg"
        />
      </div>
    </div>

    <h4 class="fr-mt-6v">Palette dégradée divergente</h4>
    <p>Cette palette convient pour matérialiser des échelles numériques mais qui intègrent des valeurs évolutives, ou des plages comportant <strong>deux extrêmes avec une ligne de base au milieu</strong>.</p>
    <p>Dans le cas où le nombre de catégories devrait être supérieur à 3, on appliquera autant de valeurs de couleurs qu’il en existe dans un dégradé allant du vert vers le rouge en passant par le jaune.</p>
    <p>Par exemple, si l’on souhaite utiliser un dégradé du vert vers le rouge en passant par le jaune, l’attribut <code>palette-colors</code> pourra être renseigné de la manière suivante : <code>['sapin', 'citron', 'coquelicot']</code>.</p>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-6v">
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Couleur haute"
          :color="COLORS_DSFR_V2.light.sapin.bg"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Couleur médiane"
          :color="COLORS_DSFR_V2.light.citron.bg"
        />
      </div>
      <div class="fr-col fr-col-md-4">
        <ColorCard
          title="Couleur basse"
          :color="COLORS_DSFR_V2.light.coquelicot.bg"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ColorCard from './ColorCard.vue';
import { COLORS_DSFR_V2 } from '@/utils/constants';
</script>

<style scoped>
code {
  color: var(--text-default-warning);
  background-color: var(--background-alt-grey);
  border: var(--border-default-grey) solid 1px;
  border-radius: 0.25rem;
  padding: 0 0.25rem;
  font-size: 0.9rem;
  font-family: 'Courier New';
}
</style>
