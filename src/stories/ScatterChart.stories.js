import { chartData } from '@/components/doc/data.js';

export default {
  component: 'scatter-chart',
};

export const Default = {
  args: chartData.scatterChart.default,
};

export const Linked = {
  args: chartData.scatterChart.linked,
};
