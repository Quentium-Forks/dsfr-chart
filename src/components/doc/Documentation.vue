<template>
  <div class="fr-container">
    <section class="fr-grid-row fr-grid-row--center fr-mt-4w fr-mt-md-8w">
      <Intro />

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
                  v-for="(section, i) in examples"
                  :key="section.title"
                  class="fr-sidemenu__item"
                >
                  <button
                    class="fr-sidemenu__btn"
                    aria-expanded="false"
                    :aria-controls="`sidemenu-${i}`"
                  >
                    {{ section.title }}
                  </button>
                  <div
                    :id="`sidemenu-${i}`"
                    class="fr-collapse"
                  >
                    <ul class="fr-sidemenu__list">
                      <template
                        v-for="(graph, j) in section.graphs"
                      >
                        <li
                          v-if="graph.heading"
                          :key="graph.heading"
                          class="fr-sidemenu__item"
                        >
                          <a
                            :id="`sidemenu-${i}.${j}`"
                            class="fr-sidemenu__link"
                            :href="'#' + encodeURIComponent(graph.heading)"
                            target="_self"
                          >{{ graph.heading }}</a>
                        </li>
                      </template>
                    </ul>
                  </div>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#databox"
                    target="_self"
                  >IX. La Databox
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
                    class="fr-sidemenu__link"
                    href="#colors"
                    target="_self"
                  >X. Les
                    couleurs
                  </a>
                </li>
                <li class="fr-sidemenu__item">
                  <a
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
          <h2>
            {{ section.title }}
          </h2>
          <p>
            {{ section.desc }}
          </p>
           
          <div
            v-for="graph in section.graphs"
            :key="graph.title"
            class="chart_container"
          >
            <h3
              v-if="graph.heading"
              :id="encodeURIComponent(graph.heading)"
            >
              {{ graph.heading }}
            </h3>
            <hr v-if="graph.heading">
            <p
              v-if="!graph.noPallete"
              class="fr-badge fr-badge--info fr-mt-1w fr-mb-1w"
            >
              {{ PALETTE_LABELS?.[graph.props.selectedPalette] ?? 'Palette par défaut' }}
            </p>
            <h3
              v-if="graph.title"
              class="fr-h6 fr-text--bold fr-mb-0"
            >
              {{ graph.title }}
            </h3>
            <p
              v-if="graph.desc"
              class="fr-text--sm"
            >
              {{ graph.desc }}
            </p>
            <component
              :is="graph.component"
              v-bind="graph.props"
            />
            <CodeBlock
              :graph-props="graph.props"
              :component="graph.component"
            />
          </div>
        </div>
        <DataBoxSection />
        <ColorsAccessibility />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import LineChart from '../LineChart.vue'
import BarChart from '../BarChart.vue'
import BarLineChart from '../BarLineChart.vue'
import PieChart from '../PieChart.vue'
import RadarChart from '../RadarChart.vue'
import ScatterChart from '../ScatterChart.vue'
import GaugeChart from '../GaugeChart.vue'
import MapChart from '../MapChart.vue'
import MapChartReg from '../MapChartReg.vue';
import { FAKE_DATA }  from './fakeData';
import CodeBlock from './CodeBlock.vue';
import ColorsAccessibility from './ColorsAccessibility.vue';
import Intro from './Intro.vue';
import DataBoxSection from './DataBoxSection.vue';

const PALETTE_LABELS = {
  defaultColor: 'Palette par défaut',
  neutral: 'Palette unicolore',
  sequentialDescending: 'Palette séquentielle',
  divergentDescending: 'Palette séquentielle divergente'
}

const examples = ref([
  {
    title: "I. Graphique en ligne",
    desc: `Un graphique en ligne est un type de visualisation de données qui
            affiche les valeurs sous forme de points sur une ligne. Elle
            permet d’affiche une seule ligne ou en présenter plusieurs pour
            permettre la comparaison.`,
    graphs: [{
      id: 'line_chart.1',
      component: LineChart,
      heading: "1. Graphique en ligne simple",
      title: "Évolution du prix des logements anciens entre 2001 et 2020",
      desc: "Indices des prix des logements neufs et anciens, France métropolitaine. Base 100 en moyenne en 2015. Insee, 04/11/2024",
      props: FAKE_DATA.lineChart.simpleLine
    }, {
      component: LineChart,
      heading: "2. Graphique en lignes multiples",
      title: "Taux d'activité selon le sexe depuis 1975",
      desc: "France hors Mayotte, personnes de 15 à 64 ans vivant en logement ordinaire. Insee, 04/11/2024",
      props: FAKE_DATA.lineChart.multiLine
    }]
  },
  {
    title:"II. Diagramme en barres",
    desc: "Un diagramme en barres montre les dénombrements de valeurs pour les niveaux d'une variable catégorielle, séquentielle ou neutre. Les barres peuvent être présentées de manière horizontale, verticale ou être empilées.",
    graphs: [
      {component: BarChart,
        heading:"1. Barres verticales",
        title: "Projection de la population française",
        desc: "Population au 1er janvier - Données issues du scénario central des projections de population 2013-2070. Insee, 04/11/2024",
        props: FAKE_DATA.barChart.vertical
      },
      {component: BarChart,
        heading:"",
        title: "Pratique de l'internet des plus de 60 ans en 2018",
        desc: "France hors Mayotte, individus de 15 ans ou plus vivant dans un ménage ordinaire. Insee, enquête Technologies de l'information et de la communication auprès des ménages, 04/11/2024",
        props: FAKE_DATA.barChart.unicolor
      },
      {component: BarChart,
        heading:"",
        title: "Les régions les plus pluvieuses de France en 2023",
        desc: "France métropolitaine uniquement. Météo France, 04/11/2024",
        props: FAKE_DATA.barChart.sequential
      },
      {component: BarChart,
        heading:"2. Barres horizontales",
        title: "Émissions de gaz à effet de serre par habitant en France",
        desc: "En tonnes équivalent CO₂ par habitant. France métropolitaine. Insee, 12/02/2024",
        props: FAKE_DATA.barChart.horizontal
      },
      {component: BarChart,
        heading:"3. Barres empilées",
        title: "Satisfaction des français à l'égard des services publics",
        desc: "Étude IFOP pour TF1, janvier 2024 - Le regard des Français sur les services publics : satisfaction, jugement sur leur financement par les impôts et attentes. Ifop, enquête Emploi, 04/01/2024",
        props: FAKE_DATA.barChart.stacked
      },
    ]
  },
  {
    title: "III. Graphique en ligne / Diagramme en barres",
    desc: "Il est également possible de combiner un graphique en ligne et un diagramme en barres, pour permettre la comparaison entre des données présentées différemment.",
    graphs: [
      {component: BarLineChart,
        title: "Évolution du nombre de naissances et du taux de natalité"
        ,desc: "France hors Mayotte, naissances en milliers et taux de natalité pour mille femmes. Insee, 16/01/2024",
        props: FAKE_DATA.barLineChart.default
      },
    ]
  },
  {
    title:"I. Nuage de points",
    desc: "Le nuage de points est largement utilisée pour présenter plusieurs séries de données. C’est une représentation graphique qui est particulièrement utile lorsque les valeurs des données sur l'axe Y dépendent des valeurs d’un autre axe X.",
    graphs: [
      {component: ScatterChart,
        heading: "IV. Nuage de points simple",
        title: "Évolution du taux moyen d'émissions de CO₂ en France",
        desc: "Véhicules particuliers neufs vendus en France. Ademe, 04/11/2024",
        props: FAKE_DATA.scatterChart.default
      },
      {component: ScatterChart,
        heading: "2. Nuage de points reliés",
        title: "Carrières complètes selon le sexe et la génération en 2016",
        desc: "Retraités ayant perçu un droit direct au cours de l’année, résidant en France, vivants au 31 décembre 2016 ; tous régimes confondus. Insee, 09/09/2011",
        props: FAKE_DATA.scatterChart.linked
      }
    ]
  },
  {
    title: "V. Diagramme circulaire",
    desc: "Un diagramme circulaire permet de représenter un petit nombre de valeurs par des angles proportionnels à la fréquence de ces valeurs. Chacune des « parts » représente une catégorie de données qui forment un ensemble, et la taille de chaque « part » est proportionnelle à son poids dans l'ensemble. Le diagramme circulaire peut être plein ou creux.",
    graphs: [
      {component: PieChart,
        heading: "1. Diagramme circulaire creux (donut)",
        title: "Statut des emplois en France",
        desc: "Pour l'année 2018. France hors Mayotte, population des ménages, personnes en emploi. Insee, enquête Emploi, 04/11/2024",
        props: FAKE_DATA.pieChart.doughnut
      },
      {component: PieChart,
        heading: "2. Diagramme circulaire plein",
        title: "Structure des dépenses publiques en France en 2022",
        desc: "France métropolitaine. Insee, 30/11/2023",
        props: FAKE_DATA.pieChart.fill
      }
    ]
  },
  {
    title: "VI. Diagramme en étoile",
    desc: "Le diagramme en étoile ou radar chart a été conçu pour représenter une ou plusieurs séries de valeurs sur plusieurs variables quantitatives.",
    graphs: [
      {component: RadarChart,
        title: "Statut des emplois par tranche d'âge",
        desc: "Pour l'année 2018. France hors Mayotte, population des ménages, personnes en emploi. Insee, enquête Emploi, 04/11/2024",
        props: FAKE_DATA.radarChart.default
      }
    ]
  },
  {
    title: "VII. Jauge",
    desc: "La jauge permet d'afficher des valeurs numériques ou des mesures dans une plage, pour visualiser l'avancement d'un objectif par exemple.",
    graphs: [
      {component: GaugeChart,
        noPallete: true,
        props: FAKE_DATA.gaugeChart.default
      }
    ]
  },
  {
    title: "VIII. Cartes",
    desc: " Les cartes permettent d’afficher une série de données réparties par département ou région. Les cartes sont actuellement disponibles aux niveaux départemental et régional, et il est également possible d’isoler une région pour en afficher les départements. ",
    graphs: [
      {component: MapChart,
        noPallete: true,
        heading: "1. Découpage départemental",
        props: FAKE_DATA.mapChart.departements
      },
      {component: MapChart,
        noPallete: true,
        heading: "2. Découpage régional",
        props: FAKE_DATA.mapChart.regions
      },
      {component: MapChartReg,
        noPallete: true,
        heading: "3. Régions",
        props: FAKE_DATA.mapChart.singleRegion
      }
    ]
  },
])

</script>

<style>
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
