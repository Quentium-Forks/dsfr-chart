import { defineCustomElement } from 'vue';

import LineChart from '@/components/LineChart.vue';
import BarChart from '@/components/BarChart.vue';
import MapChart from '@/components/MapChart.vue';
import MultiLineChart from '@/components/MultiLineChart.vue';
import BarLineChart from '@/components/BarLineChart.vue';
import PieChart from '@/components/PieChart.vue';
import ScatterChart from '@/components/ScatterChart.vue';
import MapChartReg from '@/components/MapChartReg.vue';
import GaugeChart from '@/components/GaugeChart.vue';
import TableChart from '@/components/TableChart.vue';
import RadarChart from '@/components/RadarChart.vue';

import ParentComp from '@/components/ParentComp.vue';
import DataBox2 from '@/components/DataBox2.vue';

// TODO Fix parent-comp and data-box2 to be the same component
// Actually, parent-comp should be defined first and data-box2 should be last (because of scatter chart tooltip)
customElements.define('parent-comp', defineCustomElement(ParentComp, { shadowRoot: false }));

customElements.define('line-chart', defineCustomElement(LineChart, { shadowRoot: false }));
customElements.define('bar-chart', defineCustomElement(BarChart, { shadowRoot: false }));
customElements.define('map-chart', defineCustomElement(MapChart, { shadowRoot: false }));
customElements.define('multiline-chart', defineCustomElement(MultiLineChart, { shadowRoot: false }));
customElements.define('bar-line-chart', defineCustomElement(BarLineChart, { shadowRoot: false }));
customElements.define('pie-chart', defineCustomElement(PieChart, { shadowRoot: false }));
customElements.define('scatter-chart', defineCustomElement(ScatterChart, { shadowRoot: false }));
customElements.define('map-chart-reg', defineCustomElement(MapChartReg, { shadowRoot: false }));
customElements.define('gauge-chart', defineCustomElement(GaugeChart, { shadowRoot: false }));
customElements.define('table-chart', defineCustomElement(TableChart, { shadowRoot: false }));
customElements.define('radar-chart', defineCustomElement(RadarChart, { shadowRoot: false }));

customElements.define('data-box2', defineCustomElement(DataBox2, { shadowRoot: false }));
