import { chartData } from '@/components/doc/data.js';

export default {
  component: 'map-chart-reg',
};

export const Default = {
  args: chartData.mapChartReg.region,
  argTypes: {
    date: {
      control: 'text',
    },
  },
};
