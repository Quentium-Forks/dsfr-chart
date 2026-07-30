/** @type { import('@storybook/web-components-vite').StorybookConfig } */
export default {
  stories: ['../src/**/*.stories.js'],
  framework: {
    name: '@storybook/web-components-vite',
  },
  core: {
    builder: {
      name: '@storybook/builder-vite',
      options: {
        viteConfigPath: 'vite-docs.config.js',
      },
    },
    disableTelemetry: true,
    disableWhatsNewNotifications: true,
  },
};
