import { chartData } from '@/components/doc/data.js';

export default {
  component: 'map-chart',
};

export const Departmental = {
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

export const Academic = {
  args: chartData.mapChart.academies,
  argTypes: {
    date: {
      control: 'text',
    },
  },
};

export const World = {
  args: chartData.mapChart.world,
  argTypes: {
    date: {
      control: 'text',
    },
  },
};
