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
  name: 'MapChartReg',
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
    region: {
      type: String,
      required: true,
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
      zoomDep: '',
      leftColProps: {
        localisation: '',
        names: [],
        min: 0,
        max: 0,
        colorMin: '',
        colorMax: '',
        value: 0,
        valueReg: 0,
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
      displayGuyanne: '',
      colorStrokeDOM: '#FFFFFF',
    };
  },
  created() {
    this.chartId = 'dsfr-chart-' + Math.floor(Math.random() * 1000);
    this.widgetId = 'dsfr-widget-' + Math.floor(Math.random() * 1000);
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

      // Parsing des données
      try {
        this.dataParse = JSON.parse(this.data);
      } catch (error) {
        console.error('Erreur lors du parsing des données data:', error);
        return;
      }

      // Choisir les couleurs extrêmes basées sur la palette
      const palette = this.choosePalette();

      this.colorLeft = palette[0];
      this.colorRight = palette[palette.length - 1];
      this.leftColProps.colorMin = this.colorLeft;
      this.leftColProps.colorMax = this.colorRight;
      this.leftColProps.date = this.date;
      this.leftColProps.names = this.name;

      const values = [];
      let listDep = [];

      this.FranceProps.displayDep = {};

      // Afficher uniquement les départements de la région sélectionnée
      listDep = this.getDepsFromReg(this.region);
      listDep.forEach((key) => {
        values.push(this.dataParse[key]);
      });

      // Calcul des min et max pour l'échelle
      this.scaleMin = Math.min(...values);
      this.scaleMax = Math.max(...values);

      // Define color scale based on regional values
      const colorScale = d3.scaleLinear().domain([this.scaleMin, this.scaleMax]).range([this.colorLeft, this.colorRight]);

      let xmin = [],
        xmax = [],
        ymin = [],
        ymax = [];

      // Iterate over each department in France and hide
      for (const key in this.dataParse) {
        const className = 'FR-' + key;
        const elCol = parentWidget.getElementsByClassName(className);
        elCol.length !== 0 && elCol[0].setAttribute('fill', 'rgba(255, 255, 255, 0)');
        this.FranceProps.displayDep[className] = 'none';
      }
      // Iterate over each department in the region and set colors
      listDep.forEach((key) => {
        const className = 'FR-' + key;
        const elCol = parentWidget.getElementsByClassName(className);

        if (!this.zoomDep) {
          if (listDep.includes(key)) {
            const polygon = elCol[0].getBBox();
            elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
            this.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          }
        } else {
          if (this.zoomDep === key) {
            const polygon = elCol[0].getBBox();
            elCol.length !== 0 && elCol[0].setAttribute('fill', colorScale(this.dataParse[key]));
            this.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          } else if (listDep.includes(key)) {
            const polygon = elCol[0].getBBox();
            elCol.length !== 0 && elCol[0].setAttribute('fill', this.colorLeft + 'B3');
            this.FranceProps.displayDep[className] = '';
            xmin.push(polygon.x);
            ymin.push(polygon.y);
            xmax.push(polygon.x + polygon.width);
            ymax.push(polygon.y + polygon.height);
          }
        }
      });

      // Calculate viewBox to focus on the selected region
      if (xmin.length && ymin.length && xmax.length && ymax.length) {
        const xminValue = Math.min(...xmin);
        const yminValue = Math.min(...ymin);
        const xmaxValue = Math.max(...xmax);
        const ymaxValue = Math.max(...ymax);
        const width = xmaxValue - xminValue;
        const height = ymaxValue - yminValue;
        const size = Math.max(width, height);
        this.FranceProps.viewBox = `${xminValue} ${yminValue} ${size} ${size}`;
      }

      this.leftColProps.localisation = this.getReg(this.region).department;
      this.leftColProps.value = this.value;
      this.leftColProps.valueReg = this.dataParse[this.zoomDep];
      this.leftColProps.min = this.scaleMin;
      this.leftColProps.max = this.scaleMax;
    },
    choosePalette() {
      // Using the refactored choosePalette function from utils
      return choosePalette(this.selectedPalette);
    },
    displayTooltip(e) {
      if (isMobile()) return;
      const parentWidget = this.$refs[this.widgetId];
      const hoverdep = e.target.className.baseVal.replace('FR-', '');

      const elCol = parentWidget.getElementsByClassName('FR-' + hoverdep);
      elCol[0].style.opacity = 0.8;
      this.tooltip.value = this.dataParse[hoverdep];
      this.tooltip.place = this.getDep(hoverdep).department;

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
