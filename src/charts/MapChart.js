import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/MapChart.scss';

import MapChart from '@/components/MapChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const MapChartElement = defineCustomElement(MapChart, { shadowRoot: false });

customElements.define('map-chart', MapChartElement);
