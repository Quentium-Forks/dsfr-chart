import path from 'path';

/** @type { import('@storybook/web-components-vite').StorybookConfig } */
export default {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/web-components-vite',
  },
  core: {
    // builder: '@storybook/builder-vite',
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
  // async viteFinal(config) {
  //   return {
  //     ...config,
  //     resolve: {
  //       ...config.resolve,
  //       alias: {
  //         ...config.resolve?.alias,
  //         '@': path.resolve(__dirname, '../src'),
  //       }
  //     }
  //   };
  // },  
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
