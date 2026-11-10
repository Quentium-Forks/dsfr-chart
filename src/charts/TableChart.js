import { defineCustomElement } from 'vue';

import '@/styles/style.scss';

import TableChart from '@/components/TableChart.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const TableChartElement = defineCustomElement(TableChart, { shadowRoot: false });

customElements.define('table-chart', TableChartElement);
