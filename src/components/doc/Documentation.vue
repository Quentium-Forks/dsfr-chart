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
                <li
                  v-for="section in examples"
                  :key="section.title"
                  class="fr-sidemenu__item"
                >
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    aria-controls="sidemenu-1"
                  >
                    {{ section.title }}
                  </button>
                  <div
                    id="sidemenu-1"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <li
                        v-for="chart in section.charts"
                        :key="chart.title"
                        class="fr-sidemenu__item"
                      >
                        <a
                          id="sidemenu-1.1"
                          class="fr-sidemenu__link"
                          href="#line_chart.1"
                          target="_self"
                        >{{ chart.title }}</a>
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
        <div
          v-for="section in examples"
          :key="section.title"
          class="part_container"
        >
          <h2 :id="section.id">
            {{ section.title }}
          </h2>
          <p>
            {{ section.desc }}
          </p>
           
          <div
            v-for="chart in section"
            :id="chart.title"
            :key="chart.title"
            class="chart_container"
          >
            <h3 class="fr-h6 fr-text--bold fr-mb-0">
              {{ chart.title }}
            </h3>
            <p class="fr-text--sm">
              {{ chart.desc }}
            </p>
            <p class="fr-badge fr-badge--info fr-mt-1w fr-mb-1w">
              Palette par défaut
            </p>
            <component
              :is="chart.component"
              v-bind="chart.props"
            />
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LineChart from './LineChart.vue'
import FAKE_DATA  from '../fakeData';
import CodeBlock from './CodeBlock.vue';

const examples = ref([
  {
    title: "I. Graphique en ligne",
    desc: `Un graphique en ligne est un type de visualisation de données qui
            affiche les valeurs sous forme de points sur une ligne. Elle
            permet d’affiche une seule ligne ou en présenter plusieurs pour
            permettre la comparaison.`,
    graphs: [{
      component: LineChart,
      title: "Évolution du prix des logements anciens entre 2001 et 2020",
      desc: "Indices des prix des logements neufs et anciens, France métropolitaine. Base 100 en moyenne en 2015. Insee, 04/11/2024",
      props: FAKE_DATA.lineChart.simpleLine
    }]
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
