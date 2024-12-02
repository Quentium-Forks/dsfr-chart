import { Meta } from "@storybook/web-components";

const meta: Meta = {
  component: "bar-chart",
};

export default meta;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
// export default {
//   title: 'Example/Button',
//   tags: ['autodocs'],
//   render: (args) => Button(args),
//   argTypes: {
//     backgroundColor: { control: 'color' },
//     size: {
//       control: { type: 'select' },
//       options: ['small', 'medium', 'large'],
//     },
//   },
//   args: { onClick: fn() },
// };

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    x: '[["15 à 29 ans", "30 à 44 ans", "45 à 59 ans", "60 à 74 ans", "75 ans ou plus"]]',
    y: "[[75.4, 80.5, 66.8, 43.4, 12.1]]",
    name: '["Achat sur internet au cours des 12 derniers mois (%)"]',
    "selected-palette": "neutral",
    "unit-tooltip": "%",
  },
};
