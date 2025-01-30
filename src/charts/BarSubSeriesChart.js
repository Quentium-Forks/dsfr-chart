import { defineCustomElement } from 'vue';

import BarSubSeriesChart from '@/components/BarSubSeriesChart.vue';

const BarSubSeriesChartElement = defineCustomElement(BarSubSeriesChart);

customElements.define('bar-sub-series-chart', BarSubSeriesChartElement, { shadowRoot: false });
