<template>
  <Teleport
    v-if="!databoxId || targetReady"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
    :disabled="!databoxId"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <div class="fr-col-12">
        <div class="chart">
          <div class="tooltip">
            <div class="tooltip_header fr-text--sm fr-mb-0" />
            <div class="tooltip_body">
              <div class="tooltip_value" />
            </div>
          </div>

          <div
            v-if="stacked"
            class="gauge-container"
          >
            <div
              class="gauge"
              :style="{ height: height }"
            >
              <div
                v-for="(percentage, index) in percentagesParse"
                :style="{ width: percentage + '%', backgroundColor: colorParse[0][index] }"
              ></div>
            </div>
          </div>

          <div
            v-if="stacked"
            class="chart_legend fr-mb-0 fr-mt-4v"
          >
            <div
              v-for="(item, index) in nameParse"
              :key="index"
              class="flex fr-mt-3v fr-mb-1v"
            >
              <span
                class="legend_dot"
                :style="{ 'background-color': colorParse[0][index] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(item) }}
              </p>
            </div>
          </div>

          <div
            v-else
            v-for="(percentage, index) in percentagesParse"
            class="gauge-container fr-mb-4v"
          >
            <div class="gauge-label fr-text--sm fr-mb-1v">
              <span>{{ capitalize(nameParse[index]) }}</span>
              <span>{{ percentage }}%</span>
            </div>
            <div
              class="gauge"
              :style="{ height: height }"
            >
              <div
                class="gauge-fill"
                :style="{ width: percentage + '%', backgroundColor: colorParse[index] }"
              ></div>
            </div>
          </div>

          <div
            v-if="date"
            class="flex fr-mt-1w"
          >
            <p class="fr-text--xs">Mise à jour : {{ date }}</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import { chartMixins } from '@/utils/global.js';
import { getColors } from '@/utils/colors.js';

export default {
  name: 'GaugeChart',
  mixins: [chartMixins],
  props: {
    databoxId: {
      type: String,
      default: null,
    },
    databoxType: {
      type: String,
      default: null,
    },
    databoxSource: {
      type: String,
      default: 'default',
    },
    values: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    stacked: {
      type: [Boolean, String],
      default: false,
    },
    height: {
      type: String,
      default: '1rem',
    },
    date: {
      type: String,
      default: '',
    },
    paletteType: {
      type: String,
      default: 'categorical',
    },
    paletteColors: {
      type: [Array, String],
      default: () => [],
      validator: (value) => {
        const colorNames = getColors(0, 'keys');
        const colorsToCheck = typeof value === 'string' ? JSON.parse(value) : value;
        return colorsToCheck.every((color) => colorNames.includes(color));
      },
    },
  },
  data() {
    return {
      widgetId: '',
      percentagesParse: [],
      nameParse: [],
      colorParse: [],
      colorHover: [],
      targetReady: false,
    };
  },
  watch: {
    $props: {
      handler() {
        // Check if the widget is already created to prevent useless re-renders
        if (this.widgetId) {
          this.createChart();
        }
      },
      deep: true,
      immediate: true,
    },
    targetReady(val) {
      if (val) {
        this.$nextTick(() => {
          this.createChart();
        });
      }
    },
  },
  created() {
    this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1000)}`;
  },
  mounted() {
    if (!this.databoxId || !this.databoxType) {
      this.createChart();
    } else {
      const targetId = `${this.databoxId}-${this.databoxType}-${this.databoxSource}`;
      if (document.getElementById(targetId)) {
        this.targetReady = true;
      } else {
        this._targetObserver = new MutationObserver(() => {
          if (document.getElementById(targetId)) {
            this._targetObserver.disconnect();
            this.targetReady = true;
          }
        });
        this._targetObserver.observe(document.body, { childList: true, subtree: true });
      }
    }

    document.documentElement.addEventListener('dsfr.theme', (e) => {
      if (this.widgetId !== '') {
        this.changeColors(e.detail.theme);
      }
    });
  },
  beforeUnmount() {
    if (this._targetObserver) {
      this._targetObserver.disconnect();
    }
  },
  methods: {
    getData() {
      // Parsing des données
      let tmpValuesParse = [];
      try {
        tmpValuesParse = JSON.parse(this.values);
      } catch (error) {
        console.error('Erreur lors du parsing des données values:', error);
        return;
      }

      this.percentagesParse = [];
      for (let i = 0; i < tmpValuesParse.length; i++) {
        const total = tmpValuesParse.reduce((acc, val) => acc + val, 0);
        const percentage = total > 0 ? (tmpValuesParse[i] / total) * 100 : 0;
        this.percentagesParse.push(Math.round(percentage));
      }

      let tmpNameParse = [];
      if (this.name) {
        try {
          tmpNameParse = JSON.parse(this.name);
        } catch (error) {
          console.error('Erreur lors du parsing de name:', error);
        }
      }

      this.nameParse = [];
      for (let i = 0; i < tmpValuesParse.length; i++) {
        if (tmpNameParse[i]) {
          this.nameParse.push(tmpNameParse[i]);
        } else {
          this.nameParse.push(`Série ${i + 1}`);
        }
      }

      // Chargement des couleurs
      this.loadColors();
    },
    loadColors() {
      const colors = getColors(this.percentagesParse.length, this.paletteType, this.paletteColors);
      this.colorParse = colors.background;
    },
    createChart() {
      this.getData();
    },
    changeColors(theme) {
      this.loadColors();
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/GaugeChart.scss';
</style>
