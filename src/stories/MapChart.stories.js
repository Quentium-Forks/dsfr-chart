import { chartData } from '@/components/doc/data.js';

export default {
  component: 'map-chart',
};

export const Departemental = {
  args: chartData.mapChart.departments,
  argTypes: {
    date: {
      control: 'text',
    },
  },
};

export const Regional = {
  args: chartData.mapChart.regions,
  argTypes: {
    date: {
      control: 'text',
    },
  },
};
