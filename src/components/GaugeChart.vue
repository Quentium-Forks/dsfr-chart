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
            :style="{ left: tooltip.left, top: tooltip.top, opacity: tooltip.visibility }"
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
                  <p class="tooltip_place fr-mb-0">{{ value }}%</p>
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
                :style="{ width: percentage + '%', backgroundColor: colorParse[0][index] }"
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
      tooltip: {
        left: '0px',
        top: '0px',
        visibility: 0,
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
    displayTooltip(e, index) {
      if (window.matchMedia('(hover: none)').matches) {
        return;
      }

      this.tooltip.name = this.stacked ? 'Répartition' : this.nameParse[index];
      this.tooltip.value = this.stacked ? this.percentagesParse : [this.percentagesParse[index]];
      this.tooltip.color = this.stacked ? this.colorParse[0] : [this.colorParse[index]];
      this.tooltip.visibility = 1;
      this.$nextTick(() => {
        this.positionTooltip(e);
      });
    },
    positionTooltip(e) {
      if (!this.tooltip.visibility) {
        return;
      }

      const tooltipEl = e.target.closest('.chart').querySelector('.tooltip');
      const targetRect = e.target.getBoundingClientRect();
      const gap = 10;
      let left = targetRect.right + gap;
      let top = targetRect.top + (targetRect.height - tooltipEl.offsetHeight) / 2;

      if (left + tooltipEl.offsetWidth > window.innerWidth) {
        left = targetRect.left - tooltipEl.offsetWidth - gap;
      }
      if (top + tooltipEl.offsetHeight > window.innerHeight) {
        top = window.innerHeight - tooltipEl.offsetHeight - gap;
      }
      top = Math.max(gap, top);

      this.tooltip.left = `${Math.max(gap, left)}px`;
      this.tooltip.top = `${top}px`;
    },
    hideTooltip() {
      this.tooltip.visibility = 0;
    },
  },
};
</script>

<style scoped lang="scss">
@use '@/styles/GaugeChart.scss';
</style>
