<template>
  <Teleport
    :disabled="!databoxId && !databoxType && databoxSource === 'default'"
    :to="'#' + databoxId + '-' + databoxType + '-' + databoxSource"
  >
    <div
      :ref="widgetId"
      class="widget_container fr-grid-row"
    >
      <LeftCol :data="leftColProps" />
      <div class="fr-col-12 fr-col-lg-9 align-stretch">
        <button
          v-if="zoomDep"
          class="fr-btn fr-btn--sm fr-icon-arrow-go-back-fill fr-btn--icon-left fr-btn--tertiary-no-outline fr-ml-4w"
          @click="resetGeoFilters"
        >
          Retour
        </button>
        <div class="map">
          <div
            class="map_tooltip"
            :style="{ top: tooltip.top, left: tooltip.left, visibility: tooltip.visibility }"
          >
            <div class="tooltip_header fr-text--sm fr-mb-0">
              {{ tooltip.place }}
            </div>
            <div class="tooltip_body">
              <div class="tooltip_value-content">
                <div class="tooltip_value">
                  {{ tooltip.value }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="isDep"
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france
              :config="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <div
            v-if="isReg"
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france-reg
              :config="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div>
          <!-- <div
            v-if="isAcad"
            class="france_container no_select"
            :style="{ display: displayFrance }"
          >
            <france-acad
              :config="FranceProps"
              :onclick="changeGeoLevel"
              :ondblclick="resetGeoFilters"
              :onenter="displayTooltip"
              :onleave="hideTooltip"
            />
          </div> -->
          <div class="om_container fr-grid-row no_select">
            <div
              class="om fr-col-sm"
              :style="{ display: displayGuadeloupe }"
            >
              <span
                class="om_title fr-text--xs fr-my-1w"
                :style="{ color: textMention }"
              >
                Guadeloupe
              </span>
              <guadeloupe
                height="50"
                :config="colorStrokeDOM"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayMartinique }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: textMention }"
              >
                Martinique
              </span>
              <martinique
                height="50"
                :config="colorStrokeDOM"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayGuyane }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: textMention }"
              >
                Guyane
              </span>
              <guyane
                height="50"
                :config="colorStrokeDOM"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayReunion }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: textMention }"
              >
                La Réunion
              </span>
              <reunion
                height="50"
                :config="colorStrokeDOM"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
            <div
              class="om fr-col-sm"
              :style="{ display: displayMayotte }"
            >
              <span
                class="fr-text--xs fr-my-1w"
                :style="{ color: textMention }"
              >
                Mayotte
              </span>
              <mayotte
                height="50"
                :config="colorStrokeDOM"
                :onclick="changeGeoLevel"
                :ondblclick="resetGeoFilters"
                :onenter="displayTooltip"
                :onleave="hideTooltip"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import * as d3 from 'd3-scale';
import LeftCol from '@/components/LeftCol.vue';
import maps from '@/components/maps';
import { mapsMixins, isMobile } from '@/utils/global.js';
import { choosePalette } from '@/utils/colors.js';

export default {
  name: 'MapChart',
  components: {
    LeftCol,
    ...maps,
  },
  mixins: [mapsMixins],
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
    data: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      default: '',
    },
    date: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: 'dep',
    },
    name: {
      type: String,
      default: 'Data',
    },
    selectedPalette: {
      type: String,
      default: 'sequentialAscending',
    },
  },
  data() {
    return {
      dataParse: {},
      widgetId: '',
      chartId: '',
      scaleMin: 0,
      scaleMax: 0,
      colorLeft: '',
      colorRight: '',
      isDep: true,
      isReg: false,
      isAcad: false,
      zoomDep: '',
      prefixClass: 'FR-',
      leftColProps: {
        localisation: '',
        names: [],
        min: 0,
        max: 0,
        colorMin: '',
        colorMax: '',
        value: 0,
        valueNat: 0,
        date: '',
      },
      FranceProps: {
        viewBox: '0 0 1010 1010',
        displayDep: {},
        colorStroke: '#FFFFFF',
      },
      tooltip: {
        top: '0px',
        left: '0px',
        visibility: 'hidden',
        value: 0,
        place: '',
      },
      displayFrance: '',
      displayGuadeloupe: '',
      displayMartinique: '',
      displayMayotte: '',
      displayReunion: '',
      displayGuyane: '',
      colorStrokeDOM: '#FFFFFF',
      textMention: '',
    };
  },
  created() {
    this.chartId = 'dsfr-chart-' + Math.floor(Math.random() * 1000);
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
    this.isDep = this.level === 'dep';
    this.isReg = this.level === 'reg';
    this.isAcad = this.level === 'acad';
    this.prefixClass = 'FR-' + this.level + '-';
  },
  mounted() {
    this.createChart();

    const element = document.documentElement;
    element.addEventListener('dsfr.theme', (e) => {
      if (this.chartId !== '') {
        this.changeTheme(e.detail.theme);
      }
    });
  },
  methods: {
    createChart() {
      const parentWidget = this.$refs[this.widgetId];
      const self = this;

      // Parsing des données
      try {
        this.dataParse = JSON.parse(this.data);
      } catch (error) {
        console.error('Erreur lors du parsing des données data:', error);
        return;
      }

      const palette = this.choosePalette();

      // Choisir les couleurs extrêmes basées sur la palette
      this.colorLeft = palette[0];
      this.colorRight = palette[palette.length - 1];
      this.leftColProps.colMin = this.colorLeft;
      this.leftColProps.colMax = this.colorRight;
      this.leftColProps.date = this.date;
      this.leftColProps.names = this.name;

      const values = [];
      let listDep = [];

      self.FranceProps.displayDep = {};

      // Remplir la carte avec les départements/régions
      if (this.zoomDep) {
        if (this.isDep) {
          const region = this.getDep(this.zoomDep).region_value;
          listDep = this.getDepsFromReg(region);
        } else if (this.isReg) {
          listDep = this.getAllReg();
        } else if (this.isAcad) {
          listDep = [this.getAcad(this.zoomDep).value];
        }

        for (const key of listDep) {
          values.push(self.dataParse[key]);
        }
      } else {
        for (const key in self.dataParse) {
          values.push(self.dataParse[key]);
        }
      }

      // Calcul des min et max pour l'échelle
      this.scaleMin = Math.min(...values);
      this.scaleMax = Math.max(...values);

      // Define color scale based on regional values
      const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colorLeft, this.colorRight]);

      let xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      // Iterate over each department in France and set colors
      for (const key in self.dataParse) {
        const className = 'FR-' + key;
        const elCol = parentWidget.getElementsByClassName(className);

        if (!self.zoomDep) {
          elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(self.dataParse[key]));
          self.FranceProps.displayDep[className] = '';
        } else {
          const polygon = document.querySelector('.' + className).getBBox();
          if (self.zoomDep === key) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(self.dataParse[key]));
            self.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else if (listDep.includes(key)) {
            elCol.length !== 0 && elCol[0].setAttribute('fill', self.colorLeft + 'B3');
            self.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else {
            // Hide other departments outside the selected region
            elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
            self.FranceProps.displayDep[className] = 'none';
          }
        }
      }

      if (this.zoomDep) {
        // Logic for zoom level and dimensions adjustment
        if (this.isDep) {
          this.leftColProps.localisation = this.getDep(this.zoomDep).department;
          const xminValue = Math.min(...xmin);
          const yminValue = Math.min(...ymin);
          const xmaxValue = Math.max(...xmax);
          const ymaxValue = Math.max(...ymax);
          const width = xmaxValue - xminValue;
          const height = ymaxValue - yminValue;
          const size = Math.max(width, height);
          this.FranceProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;
        } else if (this.isReg) {
          this.leftColProps.localisation = this.getReg(this.zoomDep).region;
        } else if (this.isAcad) {
          this.leftColProps.localisation = this.getAcad(this.zoomDep).academy;
        }
        this.leftColProps.value = this.value;
        this.leftColProps.valueNat = this.dataParse[this.zoomDep];

        if (this.isDep) {
          this.displayFrance = 'none';
          this.displayGuadeloupe = 'none';
          this.displayMartinique = 'none';
          this.displayMayotte = 'none';
          this.displayReunion = 'none';
          this.displayGuyane = 'none';
          // Setting visibility for DOM regions
          if ((self.zoomDep === '971' && self.level === 'dep') || (self.zoomDep === '01' && self.level === 'reg')) {
            this.displayGuadeloupe = '';
          } else if ((self.zoomDep === '972' && self.level === 'dep') || (self.zoomDep === '02' && self.level === 'reg')) {
            this.displayMartinique = '';
          } else if ((self.zoomDep === '973' && self.level === 'dep') || (self.zoomDep === '03' && self.level === 'reg')) {
            this.displayGuyane = '';
          } else if ((self.zoomDep === '974' && self.level === 'dep') || (self.zoomDep === '04' && self.level === 'reg')) {
            this.displayReunion = '';
          } else if ((self.zoomDep === '976' && self.level === 'dep') || (self.zoomDep === '06' && self.level === 'reg')) {
            this.displayMayotte = '';
          } else {
            this.displayFrance = '';
          }
        }
      } else {
        this.leftColProps.localisation = 'France';
        this.leftColProps.value = this.value;
        this.leftColProps.valueNat = 0;
        this.FranceProps.viewBox = '0 0 1010 1010';
        this.displayFrance = '';
        this.displayGuadeloupe = '';
        this.displayMartinique = '';
        this.displayMayotte = '';
        this.displayReunion = '';
        this.displayGuyane = '';
      }

      this.leftColProps.names = this.name;
      this.leftColProps.min = this.scaleMin;
      this.leftColProps.max = this.scaleMax;
      this.leftColProps.colorMin = this.colorLeft;
      this.leftColProps.colorMax = this.colorRight;
    },
    displayTooltip(e) {
      if (isMobile()) return;
      const parentWidget = this.$refs[this.widgetId];
      let hoverdep = e.target.className.baseVal.replace('FR-', '');

      const elCol = parentWidget.getElementsByClassName('FR-' + hoverdep);
      elCol[0].style.opacity = 0.8;
      this.tooltip.value = this.dataParse[hoverdep];
      if (this.isDep) {
        this.tooltip.place = this.getDep(hoverdep).department;
      } else if (this.isReg) {
        this.tooltip.place = this.getReg(hoverdep).region;
      } else if (this.isAcad) {
        this.tooltip.place = this.getAcad(hoverdep).academy;
      }

      const franceRect = parentWidget.querySelector('.france_container').getBoundingClientRect();
      const tooltipRect = parentWidget.querySelector('.map_tooltip').getBoundingClientRect();
      const containerRect = e.target.getBoundingClientRect();

      let tooltipX = containerRect.x - franceRect.x + tooltipRect.width / 3 - window.innerWidth / 20;
      let tooltipY = containerRect.y - franceRect.y + tooltipRect.height;

      if (tooltipX + tooltipRect.width / 2 > franceRect.x) {
        tooltipX = containerRect.x / 2 - franceRect.x - window.innerWidth / 20;
      }

      this.tooltip.top = tooltipY + 'px';
      this.tooltip.left = tooltipX + 'px';
      this.tooltip.visibility = 'visible';
    },
    hideTooltip(e) {
      if (isMobile()) return;
      this.tooltip.visibility = 'hidden';
      const parentWidget = this.$refs[this.widgetId];
      const hoverdep = e.target.className.baseVal.replace('FR-', '');

      const elCol = parentWidget.getElementsByClassName('FR-' + hoverdep);
      elCol[0].style.opacity = '1';
    },
    changeGeoLevel(e) {
      // Get clicked department
      let clickdep = e.target.className.baseVal.replace('FR-', '');

      this.zoomDep = clickdep;
      this.createChart();
    },
    resetGeoFilters() {
      this.zoomDep = '';
      this.createChart();
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    changeTheme(theme) {
      if (theme === 'light') {
        this.textMention = '#6b6b6b';
        this.FranceProps.colorStroke = '#FFFFFF';
        this.colorStrokeDOM = '#FFFFFF';
      } else {
        this.textMention = '#cecece';
        this.FranceProps.colorStroke = '#161616';
        this.colorStrokeDOM = '#161616';
      }
      this.createChart();
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/styles/MapChart.scss';
</style>
