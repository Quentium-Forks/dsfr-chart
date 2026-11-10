import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import RadarChart from '@/components/RadarChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const RadarChartElement = defineCustomElement(RadarChart, { shadowRoot: false });

customElements.define('radar-chart', RadarChartElement);
