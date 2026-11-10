import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import BarLineChart from '@/components/BarLineChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const BarLineChartElement = defineCustomElement(BarLineChart, { shadowRoot: false });

customElements.define('bar-line-chart', BarLineChartElement);
