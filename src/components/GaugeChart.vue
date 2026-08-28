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
          <div
            class="tooltip"
            :style="{ left: tooltip.left, top: tooltip.top, visibility: tooltip.visibility }"
          >
            <div class="tooltip_header fr-text--sm fr-mb-0">
              {{ tooltip.name }}
            </div>
            <div class="tooltip_body">
              <div class="tooltip_value">
                <div
                  v-for="(value, index) in tooltip.value"
                  :key="index"
                  class="tooltip_value-content"
                >
                  <span
                    class="tooltip_dot"
                    :style="{ backgroundColor: tooltip.color[index] }"
                  />
                  <p
                    v-if="unitTooltip === '%'"
                    class="tooltip_place fr-mb-0"
                  >
                    {{ value }}%
                  </p>
                  <p
                    v-else
                    class="tooltip_place fr-mb-0"
                  >
                    {{ valuesParse[index] }} ({{ value }}%)
                  </p>
                </div>
              </div>
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
                :key="index"
                :style="{ width: percentage + '%', backgroundColor: colorParse[index] }"
                @mouseenter="displayTooltip($event, index)"
                @mouseleave="hideTooltip"
              />
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
                :style="{ 'background-color': colorParse[index] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(item) }}
              </p>
            </div>
          </div>

          <div
            v-else
            v-for="(percentage, index) in percentagesParse"
            :key="index"
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
                :style="{ width: percentage + '%', backgroundColor: colorParse[index] }"
                @mouseenter="displayTooltip($event, index)"
                @mouseleave="hideTooltip"
              />
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
      required: true,
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
    unitTooltip: {
      type: String,
      default: '%',
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
      valuesParse: [],
      percentagesParse: [],
      nameParse: [],
      colorParse: [],
      colorHover: [],
      targetReady: false,
      tooltip: {
        left: '0px',
        top: '0px',
        visibility: 'hidden',
        name: '',
        value: [],
        color: [],
      },
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
      this.valuesParse = [];
      try {
        this.valuesParse = JSON.parse(this.values);
      } catch (error) {
        console.error('Erreur lors du parsing des données values:', error);
        return;
      }

      this.percentagesParse = [];
      const total = this.valuesParse.reduce((acc, val) => acc + val, 0);
      if (total > 0) {
        const exactPercentages = this.valuesParse.map((value) => (value / total) * 100);
        this.percentagesParse = exactPercentages.map((percentage) => Math.floor(percentage));
        let remaining = 100 - this.percentagesParse.reduce((acc, val) => acc + val, 0);

        const fractionalParts = exactPercentages.map((percentage, index) => ({ index, fraction: percentage - Math.floor(percentage) })).sort((first, second) => second.fraction - first.fraction);

        for (let i = 0; i < remaining; i++) {
          this.percentagesParse[fractionalParts[i].index] += 1;
        }
      } else if (this.percentagesParse.length > 0) {
        this.percentagesParse = this.valuesParse.map(() => 0);
        this.percentagesParse[this.percentagesParse.length - 1] = 100;
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
      for (let i = 0; i < this.valuesParse.length; i++) {
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
      if (this.stacked && this.paletteType === 'gradient') {
        this.colorParse = this.colorParse[0];
      }
    },
    createChart() {
      this.getData();
    },
    changeColors(theme) {
      this.loadColors();
    },
    displayTooltip(e, index) {
      if (window.matchMedia('(hover: none)').matches) {
        return;
      }

      this.tooltip.name = this.stacked ? 'Répartition' : this.nameParse[index];
      this.tooltip.value = this.stacked ? this.percentagesParse : [this.percentagesParse[index]];
      this.tooltip.color = this.stacked ? this.colorParse : [this.colorParse[index]];

      const chartEl = e.target.closest('.chart');
      const tooltipEl = chartEl.querySelector('.tooltip');
      const chartRect = chartEl.getBoundingClientRect();
      const targetRect = e.target.getBoundingClientRect();
      const gap = 10;

      let top = targetRect.top - chartRect.top + (targetRect.height - tooltipEl.offsetHeight) / 2 + gap;
      let left = targetRect.right - chartRect.left + gap;

      if (left + tooltipEl.offsetWidth > chartRect.width) {
        left = targetRect.left - chartRect.left - tooltipEl.offsetWidth - gap;
      }

      this.tooltip.top = `${top}px`;
      this.tooltip.left = `${Math.max(gap, left)}px`;
      this.tooltip.visibility = 'visible';
    },
    hideTooltip() {
      this.tooltip.visibility = 'hidden';
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/GaugeChart.scss';
</style>
