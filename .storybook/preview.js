import '../node_modules/@gouvfr/dsfr/dist/dsfr.module.min.js'
import "../node_modules/@gouvfr/dsfr/dist/dsfr.main.min.css";
import "../node_modules/@gouvfr/dsfr/dist/utility/utility.main.min.css";
import "../node_modules/@gouvfr/dsfr/dist/utility/icons/icons-system/icons-system.min.css";

import "../Charts/dsfr-chart.umd";
import "../Charts/dsfr-chart.css";

document.addEventListener("DOMContentLoaded", function () {
    if (window.dsfr && window.dsfr.start) {
    window.dsfr.start();
  }
});

/** @type { import('@storybook/web-components').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
