<template>
  <div class="fr-container">
    <section class="fr-grid-row fr-grid-row--center fr-mt-4w fr-mt-md-8w">
      <div class="fr-col-12 fr-col-md-10 fr-mb-4w">
        <h1 class="fr-pt-2w">
          DSFR Charts
        </h1>
        <p>
          Cette page a pour objectif de présenter l'ensemble des représentations
          graphiques proposées par la librairie
          <a
            id="dsfr-charts-github-page"
            href="https://github.com/GouvernementFR/dsfr-chart"
            target="_blank"
          >DSFR Charts</a>.<br>
          Tous les graphiques proposés sont disponibles dans le thème clair et
          dans le thème sombre. Il est possible de changer le thème affiché par
          l'intermédiaire du bouton en bas à droite.
        </p>
      </div>

      <!-- SIDE MENU -->
      <div class="fr-col-12 fr-col-md-3">
        <nav
          class="fr-sidemenu fr-sidemenu--sticky-full-height"
          role="navigation"
          aria-labelledby="sidemenu-title-5068"
        >
          <div class="fr-sidemenu__inner fr-mb-4w">
            <button
              class="fr-sidemenu__btn"
              aria-controls="sidemenu-5069"
              aria-expanded="false"
            >
              Dans cette rubrique
            </button>
            <div
              id="sidemenu-5069"
              class="fr-collapse"
            >
              <p
                id="sidemenu-title-5068"
                class="fr-sidemenu__title fr-sr-only"
              >
                Menu de navigation
              </p>
              <ul class="fr-sidemenu__list">
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-1"
                  >
                    I. Graphique en ligne
                  </button>
                  <div
                    id="sidemenu-1"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-1.1"
                          class="fr-sidemenu__link"
                          href="#line_chart.1"
                          target="_self"
                        >1. Graphique en ligne simple</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-1.2"
                          class="fr-sidemenu__link"
                          href="#line_chart.2"
                          target="_self"
                        >2. Graphique en lignes multiples</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-2"
                  >
                    II. Diagramme en barres
                  </button>
                  <div
                    id="sidemenu-2"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-2.1"
                          class="fr-sidemenu__link"
                          href="#bar_chart.1"
                          target="_self"
                        >1. Barres verticales</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-2.2"
                          class="fr-sidemenu__link"
                          href="#bar_chart.2"
                          target="_self"
                        >2. Barres horizontales</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-2.3"
                          class="fr-sidemenu__link"
                          href="#bar_chart.3"
                          target="_self"
                        >3. Barres empilées</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    id="sidemenu-3"
                    class="fr-sidemenu__link"
                    href="#bar_line_chart"
                    target="_self"
                  >III. Graphique en ligne / Diagramme en barres</a>
                </li>
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-4"
                  >
                    IV. Nuage de points
                  </button>
                  <div
                    id="sidemenu-4"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-4.1"
                          class="fr-sidemenu__link"
                          href="#scatter_chart.1"
                          target="_self"
                        >1. Nuage de points simple</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-4.2"
                          class="fr-sidemenu__link"
                          href="#scatter_chart.2"
                          target="_self"
                        >2. Nuage de points reliés</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-5"
                  >
                    V. Diagramme circulaire
                  </button>
                  <div
                    id="sidemenu-5"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-5.1"
                          class="fr-sidemenu__link"
                          href="#pie_chart.1"
                          target="_self"
                        >1. Diagramme circulaire creux (donut)</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-5.2"
                          class="fr-sidemenu__link"
                          href="#pie_chart.2"
                          target="_self"
                        >2. Diagramme circulaire plein</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    id="sidemenu-6"
                    class="fr-sidemenu__link"
                    href="#radar_chart"
                    target="_self"
                  >VI.
                    Diagramme en étoile</a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    id="sidemenu-7"
                    class="fr-sidemenu__link"
                    href="#gauge_chart"
                    target="_self"
                  >VII.
                    Jauge
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-8"
                  >
                    VIII. Cartes
                  </button>
                  <div
                    id="sidemenu-8"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-8.1"
                          class="fr-sidemenu__link"
                          href="#map_chart.1"
                          target="_self"
                        >1. Découpage départemental</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-8.2"
                          class="fr-sidemenu__link"
                          href="#map_chart.2"
                          target="_self"
                        >2. Découpage régional</a>
                      </li>
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-8.3"
                          class="fr-sidemenu__link"
                          href="#map_chart.3"
                          target="_self"
                        >3. Régions</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-9"
                  >
                    IX. Les composants
                  </button>
                  <div
                    id="sidemenu-9"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li class="fr-sidemenu__item">
                        <a
                          id="sidemenu-9.1"
                          class="fr-sidemenu__link"
                          href="#databox"
                          target="_self"
                        >1. La Databox</a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    id="sidemenu-10"
                    class="fr-sidemenu__link"
                    href="#colors"
                    target="_self"
                  >X. Les
                    couleurs
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    id="sidemenu-11"
                    class="fr-sidemenu__link"
                    href="#accessibility"
                    target="_self"
                  >XI. Accessibilité
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div class="fr-col-12 fr-col-md-7">
        <!-- LINE CHART -->

        <div
          v-for="example in examples"
          :id="example.title"
          :key="example.title"
          class="chart_container"
        >
          <h3 class="fr-h6 fr-text--bold fr-mb-0">
            {{ example.title }}
          </h3>
          <p class="fr-text--sm">
            {{ example.desc }}
          </p>
          <component
            :is="example.component"
            v-bind="example.props"
          />
        </div>


        <div class="part_container">
          <h2 id="line_chart">
            I. Graphique en ligne
          </h2>
          <p>
            Un graphique en ligne est un type de visualisation de données qui
            affiche les valeurs sous forme de points sur une ligne. Elle permet
            d’affiche une seule ligne ou en présenter plusieurs pour permettre
            la comparaison.
          </p>
          <h3 id="line_chart.1">
            1. Graphique en ligne simple
          </h3>
          <hr>
          <p class="fr-badge fr-badge--info fr-mt-1w fr-mb-1w">
            Palette par défaut
          </p>
          <div class="chart_container">
            <h3 class="fr-h6 fr-text--bold fr-mb-0">
              Évolution du prix des logements anciens entre 2001 et 2020
            </h3>
            <p class="fr-text--sm">
              Indices des prix des logements neufs et anciens, France
              métropolitaine. Base 100 en moyenne en 2015. Insee, 04/11/2024
            </p>
            <line-chart
              x="[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]"
              y="[51.50, 55.30, 61.50, 70.20, 81.10, 92.60, 100.20, 104.60, 96.90, 98.00, 104.90, 106.80, 104.70, 102.70, 100.20, 100.40, 102.90, 106.00, 109.10, 114.60]"
              selected-palette="defaultColor"
              name="Indices des prix des logements anciens"
              unit-tooltip="Points d'indice"
            />
          </div>
          <section class="fr-accordion fr-mt-4w fr-mb-6w">
            <h3 class="fr-accordion__title">
              <button
                class="fr-accordion__btn"
                aria-expanded="false"
                aria-controls="accordion-9"
              >
                Extrait de code
              </button>
            </h3>
            <div
              id="accordion-9"
              class="fr-collapse"
            >
              <div class="code-toolbar">
                <pre>
                  <code>
                    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>line-chart</span>
                      <span class="token attr-name">x</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">[2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]</span><span class="token punctuation">'</span></span>
                      <span class="token attr-name">y</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">[51.50, 55.30, 61.50, 70.20, 81.10, 92.60, 100.20, 104.60, 96.90, 98.00, 104.90, 106.80, 104.70, 102.70, 100.20, 100.40, 102.90, 106.00, 109.10, 114.60]</span><span class="token punctuation">'</span></span>
                      <span class="token attr-name">selected-palette</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span><span class="titre_class">defaultColor</span><span class="token punctuation">"</span></span>
                      <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">Indices des prix des logements anciens</span><span class="token punctuation">'</span></span>
                      <span class="token attr-name">unit-tooltip</span><span class="token punctuation">=</span><span class="token punctuation">'</span><span class="titre_class">Points d'indice</span><span class="token punctuation">'</span></span>
                    <span class="token punctuation">&gt;</span><span class="token tag"><span class="token tag" /><span class="token punctuation">&lt;/</span>line-chart</span><span class="token punctuation">&gt;</span>
                </code>
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LineChart from './LineChart.vue'
import FAKE_DATA  from '../fakeData';

const examples = ref([
    {
        component: LineChart,
        title: "Évolution du prix des logements anciens entre 2001 et 2020",
        desc: "Indices des prix des logements neufs et anciens, France métropolitaine. Base 100 en moyenne en 2015. Insee, 04/11/2024",
        props: FAKE_DATA.lineChart.simpleLine
    }
])

</script>

<style scoped>
.code-toolbar {
    background-color: #f5f2f0;
    overflow: scroll;
}

.attr-name,
.builtin,
.char,
.inserted,
.selector,
.string {
    color: #690;
}

.punctuation {
    color: #999;
}

.tag {
    color: #905;
}

.titre_class {
    color: #000091;
}

.flex {
    display: flex;
    margin-bottom: 1rem;
}

.legende_dot {
    min-width: 1.5rem;
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    background-color: var(--blue-france-sun-113-625);
    display: inline-block;
    margin-top: 0rem;
    margin-left: 1rem;
}

.fr-display-button {
    position: fixed;
    bottom: 3.5rem;
    right: 2rem;
}
</style>
