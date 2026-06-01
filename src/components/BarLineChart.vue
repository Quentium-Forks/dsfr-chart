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

          <canvas
            :ref="chartId"
            role="img"
            :aria-labelledby="databoxId ? 'title-' + databoxId : null"
            :aria-label="!databoxId ? 'Graphique en ligne / Diagramme en barres' : null"
          />

          <div class="chart_legend fr-mb-0 fr-mt-4v">
            <div class="flex fr-mt-3v fr-mb-1v">
              <span
                class="legend_dot"
                :style="{ 'background-color': colorBarParse[0] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(nameBar) }}
              </p>
            </div>
            <div class="flex fr-mt-3v fr-mb-1v">
              <span
                class="legend_dot"
                :style="{ 'background-color': colorLineParse[0] }"
              />
              <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
                {{ capitalize(nameLine) }}
              </p>
            </div>
          </div>

          <div
            v-for="(item, index) in hlineNameParse"
            :key="index"
            class="flex"
          >
            <span
              class="legend_dash_line"
              :style="{ 'background-color': hlineColorParse[index] }"
            />
            <span
              class="legend_dash_line legend_dash_line_end"
              :style="{ 'background-color': hlineColorParse[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(item) }}
            </p>
          </div>
          <div
            v-for="(item, index) in vlineNameParse"
            :key="index"
            class="flex"
          >
            <span
              class="legend_dash_line"
              :style="{ 'background-color': vlineColorParse[index] }"
            />
            <span
              class="legend_dash_line legend_dash_line_end"
              :style="{ 'background-color': vlineColorParse[index] }"
            />
            <p class="fr-text--sm fr-text--bold fr-ml-1w fr-mb-0">
              {{ capitalize(item) }}
            </p>
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
import { Chart, LineController, LineElement } from 'chart.js';
import { chartMixins, configureChartDefaults } from '@/utils/global.js';
import { getColors } from '@/utils/colors.js';

Chart.register(LineController, LineElement);

export default {
  name: 'BarLineChart',
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
    x: {
      type: String,
      required: true,
    },
    yBar: {
      type: String,
      required: true,
    },
    yLine: {
      type: String,
      required: true,
    },
    xMin: {
      type: [Number, String],
      default: '',
    },
    xMax: {
      type: [Number, String],
      default: '',
    },
    yBarMin: {
      type: [Number, String],
      default: '',
    },
    yBarMax: {
      type: [Number, String],
      default: '',
    },
    yLineMin: {
      type: [Number, String],
      default: '',
    },
    yLineMax: {
      type: [Number, String],
      default: '',
    },
    nameBar: {
      type: String,
      default: '',
    },
    nameLine: {
      type: String,
      default: '',
    },
    barSize: {
      type: [Number, String],
      default: 'flex',
    },
    maxBarSize: {
      type: [Number, String],
      default: 32,
    },
    vline: {
      type: String,
      default: '',
    },
    vlinecolor: {
      type: String,
      default: '',
    },
    vlinename: {
      type: String,
      default: '',
    },
    hline: {
      type: String,
      default: '',
    },
    hlinecolor: {
      type: String,
      default: '',
    },
    hlinename: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: '',
    },
    aspectRatio: {
      type: [Number, String],
      default: 2,
    },
    unitTooltipBar: {
      type: String,
      default: '',
    },
    unitTooltipLine: {
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
    this.chart = undefined;

    return {
      widgetId: '',
      chartId: '',
      datasets: [],
      labels: [],
      xparse: [],
      ybarparse: [],
      ylineparse: [],
      vlineParse: [],
      vlineColorParse: [],
      tmpVlineColorParse: [],
      vlineNameParse: [],
      hlineParse: [],
      hlineColorParse: [],
      tmpHlineColorParse: [],
      hlineNameParse: [],
      colorLineParse: [],
      colorBarParse: [],
      colorLineHover: [],
      colorBarHover: [],
      targetReady: false,
    };
  },
  watch: {
    $props: {
      handler() {
        // Check if the chart is already created to prevent useless re-renders
        if (this.chartId) {
          this.resetData();
          this.getData();
          this.createChart();
        }
      },
      deep: true,
      immediate: true,
    },
    targetReady(val) {
      if (val) {
        this.$nextTick(() => {
          this.resetData();
          this.createChart();
        });
      }
    },
  },
  created() {
    configureChartDefaults();
    this.chartId = `dsfr-chart-${Math.floor(Math.random() * 1000)}`;
    this.widgetId = `dsfr-widget-${Math.floor(Math.random() * 1000)}`;
  },
  mounted() {
    if (!this.databoxId || !this.databoxType) {
      this.resetData();
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
      if (this.chartId !== '') {
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
    resetData() {
      if (this.chart) {
        this.chart.destroy();
      }
      this.datasets = [];
      this.labels = [];
      this.xparse = [];
      this.ybarparse = [];
      this.ylineparse = [];
      this.vlineParse = [];
      this.vlineColorParse = [];
      this.tmpVlineColorParse = [];
      this.vlineNameParse = [];
      this.hlineParse = [];
      this.hlineColorParse = [];
      this.tmpHlineColorParse = [];
      this.hlineNameParse = [];
      this.colorLineParse = [];
      this.colorBarParse = [];
      this.colorLineHover = [];
      this.colorBarHover = [];
    },
    getData() {
      // Parsing des données
      try {
        this.xparse = JSON.parse(this.x);
        this.ybarparse = JSON.parse(this.yBar);
        this.ylineparse = JSON.parse(this.yLine);
      } catch (error) {
        console.error('Erreur lors du parsing des données x ou y-bar ou y-line:', error);
        return;
      }

      // Récupération données Vline
      if (this.vline) {
        this.vlineParse = JSON.parse(this.vline);
        let tmpVlineNameParse = [];
        if (this.vlinename) {
          tmpVlineNameParse = JSON.parse(this.vlinename);
        }
        if (this.vlinecolor) {
          this.tmpVlineColorParse = JSON.parse(this.vlinecolor);
        }

        for (let i = 0; i < this.vlineParse.length; i++) {
          if (tmpVlineNameParse[i]) {
            this.vlineNameParse.push(tmpVlineNameParse[i]);
          } else {
            this.vlineNameParse.push(`V${i + 1}`);
          }
        }
      }

      // Récupération données Hline
      if (this.hline) {
        this.hlineParse = JSON.parse(this.hline);
        let tmpHlineNameParse = [];
        if (this.hlinename) {
          tmpHlineNameParse = JSON.parse(this.hlinename);
        }
        if (this.hlinecolor) {
          this.tmpHlineColorParse = JSON.parse(this.hlinecolor);
        }

        for (let i = 0; i < this.hlineParse.length; i++) {
          if (tmpHlineNameParse[i]) {
            this.hlineNameParse.push(tmpHlineNameParse[i]);
          } else {
            this.hlineNameParse.push(`H${i + 1}`);
          }
        }
      }

      // Assignation des labels
      this.labels = this.xparse;

      // Chargement des couleurs
      this.loadColors();

      // Préparation des datasets
      this.datasets = [
        {
          data: this.ybarparse,
          type: 'bar',
          borderColor: this.colorBarParse[0],
          backgroundColor: this.colorBarParse[0],
          hoverBorderColor: this.colorBarHover[0],
          hoverBackgroundColor: this.colorBarHover[0],
          pointRadius: 5,
          pointHoverRadius: 5,
          barThickness: this.barSize,
          ...(this.maxBarSize ? { maxBarThickness: this.maxBarSize } : {}),
          barPercentage: 0.5,
        },
        {
          data: this.ylineparse,
          type: 'line',
          borderColor: this.colorLineParse[0],
          backgroundColor: this.colorLineParse[0],
          hoverBorderColor: this.colorLineHover[0],
          hoverBackgroundColor: this.colorLineHover[0],
          pointBorderColor: this.colorLineParse[0],
          pointBackgroundColor: this.colorLineParse[0],
          pointHoverBorderColor: this.colorLineHover[0],
          pointHoverBackgroundColor: this.colorLineHover[0],
          pointRadius: 5,
          pointHoverRadius: 5,
          yAxisID: 'yLine',
          tension: 0.4,
        },
      ];
    },
    loadColors() {
      const colors = getColors(this.ylineparse.length + this.ybarparse.length, this.paletteType, this.paletteColors);
      this.colorBarParse = [colors.background[0]];
      this.colorLineParse = [colors.background[1]];
      this.colorBarHover = [colors.hover[0]];
      this.colorLineHover = [colors.hover[1]];

      // Couleurs pour les lignes verticales (vlines)
      this.vlineColorParse = [];
      for (let i = 0; i < this.vlineParse.length; i++) {
        if (this.tmpVlineColorParse[i]) {
          this.vlineColorParse.push(this.tmpVlineColorParse[i]);
        } else {
          this.vlineColorParse.push('#6b6b6b');
        }
      }

      // Couleurs pour les lignes horizontales (hlines)
      this.hlineColorParse = [];
      for (let i = 0; i < this.hlineParse.length; i++) {
        if (this.tmpHlineColorParse[i]) {
          this.hlineColorParse.push(this.tmpHlineColorParse[i]);
        } else {
          this.hlineColorParse.push('#6b6b6b');
        }
      }
    },
    createChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.getData();

      const ctx = this.$refs[this.chartId].getContext('2d');

      this.chart = new Chart(ctx, {
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        plugins: [
          {
            afterDatasetDraw: (chart) => {
              if (this.vlineParse) {
                this.vlineParse.forEach((line, i) => {
                  const { ctx } = chart;
                  const x = chart.scales.x.getPixelForValue(line);

                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(x, chart.scales.y.bottom);
                  ctx.strokeStyle = this.vlineColorParse[i];
                  ctx.lineWidth = 3;
                  ctx.setLineDash([10, 5]);
                  ctx.lineTo(x, chart.scales.y.top);
                  ctx.stroke();
                  ctx.restore();
                });
              }
              if (this.hlineParse) {
                this.hlineParse.forEach((line, i) => {
                  const { ctx } = chart;
                  const y = chart.scales.y.getPixelForValue(line);

                  ctx.save();
                  ctx.beginPath();
                  ctx.moveTo(chart.scales.x.left, y);
                  ctx.strokeStyle = this.hlineColorParse[i];
                  ctx.lineWidth = 3;
                  ctx.setLineDash([10, 5]);
                  ctx.lineTo(chart.scales.x.right, y);
                  ctx.stroke();
                  ctx.restore();
                });
              }
            },
            afterDraw: (chart) => {
              if (chart.tooltip?._active && chart.tooltip?._active.length) {
                const { ctx } = chart;
                const { x } = chart.tooltip.getActiveElements()[0].element.tooltipPosition();
                const { index } = chart.tooltip._active[0];

                const yBar = chart.scales.y.getPixelForValue(this.ybarparse[index]);
                const yLine = chart.scales.yLine.getPixelForValue(this.ylineparse[index]);

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, chart.scales.y.top);
                ctx.lineTo(x, chart.scales.y.bottom);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(chart.scales.x.right, yLine);
                ctx.lineTo(x, yLine);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(chart.scales.x.left, yBar);
                ctx.lineTo(x, yBar);
                ctx.lineWidth = 1;
                ctx.strokeStyle = this.colorPrecisionBar;
                ctx.setLineDash([10, 5]);
                ctx.stroke();
                ctx.restore();
              }
            },
          },
        ],
        options: {
          aspectRatio: this.aspectRatio,
          scales: {
            x: {
              offset: true,
              grid: {
                drawTicks: false,
                drawOnChartArea: false,
              },
              ...(this.xMin ? { suggestedMin: this.xMin } : {}),
              ...(this.xMax ? { suggestedMax: this.xMax } : {}),
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                padding: 10,
                maxTicksLimit: 5,
                callback: (value) => {
                  if (Math.abs(value) >= 1000000000) {
                    return `${value / 1e9}B`;
                  } else if (Math.abs(value) >= 1000000) {
                    return `${value / 1e6}M`;
                  } else if (Math.abs(value) >= 1000) {
                    return `${value / 1e3}K`;
                  }
                  return value;
                },
              },
              ...(this.yBarMin ? { suggestedMin: this.yBarMin } : {}),
              ...(this.yBarMax ? { suggestedMax: this.yBarMax } : {}),
            },
            yLine: {
              type: 'linear',
              position: 'right',
              id: 'yLine',
              beginAtZero: true,
              grid: {
                drawTicks: false,
              },
              border: {
                dash: [3],
              },
              ticks: {
                autoSkip: false,
                padding: 10,
                maxTicksLimit: 5,
                callback: (value) => {
                  if (Math.abs(value) >= 1000000000) {
                    return `${value / 1e9}B`;
                  } else if (Math.abs(value) >= 1000000) {
                    return `${value / 1e6}M`;
                  } else if (Math.abs(value) >= 1000) {
                    return `${value / 1e3}K`;
                  }
                  return value;
                },
              },
              ...(this.yLineMin ? { suggestedMin: this.yLineMin } : {}),
              ...(this.yLineMax ? { suggestedMax: this.yLineMax } : {}),
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              displayColors: false,
              backgroundColor: '#6b6b6b',
              callbacks: {
                label: (tooltipItems) => this.datasets.map((set) => this.formatNumber(set.data[tooltipItems.dataIndex])),
                title: (tooltipItems) => tooltipItems[0].label,
                labelTextColor: () => this.colorLineParse,
              },
              external: (context) => {
                // Tooltip Element
                const dom = document.getElementById(`${this.databoxId}-${this.databoxType}-${this.databoxSource}`) || this.$el.nextElementSibling;

                const tooltipEl = dom.querySelector('.tooltip');

                const tooltipModel = context.tooltip;

                if (!tooltipEl) {
                  return;
                }

                // Hide if no tooltip
                if (!tooltipModel || tooltipModel.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                // Set tooltip position classes
                tooltipEl.classList.remove('above', 'below', 'no-transform');
                if (tooltipModel.yAlign) {
                  tooltipEl.classList.add(tooltipModel.yAlign);
                } else {
                  tooltipEl.classList.add('no-transform');
                }

                // Set tooltip content
                if (tooltipModel.body) {
                  const titleLines = tooltipModel.title || [];
                  const bodyLines = tooltipModel.body.map((bodyItem) => bodyItem.lines);

                  // Set the title in the tooltip header
                  const divDate = tooltipEl.querySelector('.tooltip_header.fr-text--sm.fr-mb-0');
                  divDate.innerText = titleLines[0];

                  // Clear the existing tooltip content
                  const divValue = tooltipEl.querySelector('.tooltip_value');
                  divValue.innerHTML = '';

                  // Iterate over bodyLines to set the color and value in the tooltip
                  bodyLines[0].forEach((line, i) => {
                    if (line && line !== 'NaN') {
                      // Détecter si c'est une barre ou une ligne en fonction de l'index
                      const displayValue = i === 0 ? `${line}${this.unitTooltipBar ? ` ${this.unitTooltipBar}` : ''}` : `${line}${this.unitTooltipLine ? ` ${this.unitTooltipLine}` : ''}`;

                      divValue.innerHTML += `
                        <div class="tooltip_value-content">
                          <span class="tooltip_dot" data-color="${[this.colorBarParse, this.colorLineParse][i]}"></span>
                          <p class="tooltip_place fr-mb-0">${displayValue}</p>
                        </div>
                      `;

                      divValue.querySelectorAll('.tooltip_dot').forEach((dot) => {
                        dot.style.backgroundColor = dot.getAttribute('data-color');
                      });
                    }
                  });
                }

                // Position the tooltip
                const { offsetLeft: positionX, offsetTop: positionY } = this.chart.canvas;

                const canvasWidth = Number(this.chart.canvas.style.width.replace(/\D/g, ''));
                const canvasHeight = Number(this.chart.canvas.style.height.replace(/\D/g, ''));

                let tooltipX = positionX + tooltipModel.caretX + 10;
                let tooltipY = positionY + tooltipModel.caretY - 20;
                if (tooltipX + tooltipEl.clientWidth > positionX + canvasWidth) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth - 10;
                }
                if (tooltipY + tooltipEl.clientHeight > positionY + 0.9 * canvasHeight) {
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight + 20;
                }
                if (tooltipX < positionX) {
                  tooltipX = positionX + tooltipModel.caretX - tooltipEl.clientWidth / 2;
                  tooltipY = positionY + tooltipModel.caretY - tooltipEl.clientHeight - 20;
                }

                tooltipEl.style.position = 'absolute';
                tooltipEl.style.padding = `${tooltipModel.padding}px ${tooltipModel.padding}px`;
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.left = `${tooltipX}px`;
                tooltipEl.style.top = `${tooltipY}px`;
                tooltipEl.style.opacity = 1;
              },
            },
          },
        },
      });
    },
    changeColors(theme) {
      this.loadColors();

      // Mise à jour des couleurs dans le graphique
      this.chart.data.datasets.forEach((dataset) => {
        dataset.borderColor = this.colorLineParse[0];
        dataset.backgroundColor = this.colorBarParse[0];
        dataset.hoverBorderColor = this.colorLineHover[0];
        dataset.hoverBackgroundColor = this.colorBarHover[0];
        dataset.pointBorderColor = this.colorLineParse[0];
        dataset.pointBackgroundColor = this.colorLineParse[0];
        dataset.pointHoverBorderColor = this.colorLineHover[0];
        dataset.pointHoverBackgroundColor = this.colorLineHover[0];
      });

      this.chart.options.scales.x.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.y.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;
      this.chart.options.scales.yLine.ticks.color = theme === 'dark' ? '#cecece' : Chart.defaults.color;

      this.chart.update('none');
    },
  },
};
</script>
