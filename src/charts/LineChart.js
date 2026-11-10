import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import LineChart from '@/components/LineChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const LineChartElement = defineCustomElement(LineChart, { shadowRoot: false });

customElements.define('line-chart', LineChartElement);
