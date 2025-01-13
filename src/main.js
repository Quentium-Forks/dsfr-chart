import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js';
import '../node_modules/@gouvfr/dsfr/dist/dsfr.main.min.css';
import '../node_modules/@gouvfr/dsfr/dist/utility/utility.main.min.css';

import '@/charts/main.js';
import { createApp } from 'vue';
import Documentation from './components/Documentation.vue';

 createApp(Documentation).mount('#root')