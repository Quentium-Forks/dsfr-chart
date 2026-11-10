import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import PieChart from '@/components/PieChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const PieChartElement = defineCustomElement(PieChart, { shadowRoot: false });

customElements.define('pie-chart', PieChartElement);
