import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/MapChart.scss';

import MapChartReg from '@/components/MapChartReg.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const MapChartRegElement = defineCustomElement(MapChartReg, { shadowRoot: false });

customElements.define('map-chart-reg', MapChartRegElement);
