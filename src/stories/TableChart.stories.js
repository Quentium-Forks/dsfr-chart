import { chartData } from '@/components/doc/data.js';

export default {
  component: 'table-chart',
};

export const Chart = {
  args: chartData.tableChart.chart,
};

export const Line = {
  args: chartData.tableChart.line,
};
