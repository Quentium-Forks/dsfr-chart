import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import BarChart from '@/components/BarChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const BarChartElement = defineCustomElement(BarChart, { shadowRoot: false });

customElements.define('bar-chart', BarChartElement);
