import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/GaugeChart.scss';

import GaugeChart from '@/components/GaugeChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const GaugeChartElement = defineCustomElement(GaugeChart, { shadowRoot: false });

customElements.define('gauge-chart', GaugeChartElement);
