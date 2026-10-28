// This test require the project to be build and storybook running to work

import { test, expect } from '@playwright/test';
import { basename } from 'node:path';

// Small hack because page.waitForSelector is not working with storybook
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const storyIndex = await fetch('http://localhost:6006/index.json').then((response) => response.json());
const stories = Object.values(storyIndex.entries)
  .filter((entry) => entry.type === 'story')
  .map((entry) => ({
    name: basename(entry.importPath).split('.')[0],
    paths: [{ name: entry.name, url: `/?path=/story/${entry.id}` }],
  }));

test.describe('Charts visual regression', () => {
  stories.forEach((story) => {
    story.paths.forEach((path) => {
      test(`${story.name} - ${path.name}`, async ({ page, browserName }) => {
        await page.goto(path.url);
        await page.setViewportSize({ width: 1920, height: 1080 });
        await sleep(5000);

        const graph = page.locator('#storybook-preview-iframe');

        const name = `${story.name.toLowerCase()}-${path.name.toLowerCase()}-${browserName}.png`;

        await expect(graph).toHaveScreenshot(name, {
          animations: 'disabled',
        });
      });
    });
  });
});

test.describe('Dev doc page visual regression', () => {
  test('Full page', async ({ page, browserName }) => {
    await page.goto('http://localhost:5173/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await sleep(3000);

    const name = `dev-doc-full-page-${browserName}.png`;

    await expect(page).toHaveScreenshot(name, {
      animations: 'disabled',
      fullPage: true,
    });
  });
});
