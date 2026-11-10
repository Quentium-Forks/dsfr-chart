import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import ScatterChart from '@/components/ScatterChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const ScatterChartElement = defineCustomElement(ScatterChart, { shadowRoot: false });

customElements.define('scatter-chart', ScatterChartElement);
