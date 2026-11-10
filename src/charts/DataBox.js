import { defineCustomElement } from 'vue';

import '@/styles/style.scss';
import '@/styles/DataBox.scss';

import DataBox from '@/components/DataBox.vue';

export { getColorSet, setColorSet } from '@/utils/colors.js';

const DataBoxElement = defineCustomElement(DataBox, { shadowRoot: false });

customElements.define('data-box', DataBoxElement);
