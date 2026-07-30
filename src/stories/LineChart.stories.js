import { chartData } from '@/components/doc/data.js';

export default {
  component: 'line-chart',
};

export const Default = {
  args: chartData.lineChart.default,
};

export const Multiple = {
  args: chartData.lineChart.multiple,
};
