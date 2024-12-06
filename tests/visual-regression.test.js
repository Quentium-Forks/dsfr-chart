// @ts-check
const { test, expect } = require('@playwright/test')
const { readdirSync } = require('fs')

const stories = readdirSync('src/stories')
  .filter((file) => file.endsWith('.stories.js'))
  .map((file) => ({
    name: file.split('.')[0],
    path: `/?path=/story/stories-${file.split('.')[0].toLowerCase()}--default`
  }))

stories.forEach((story) => {
  test(story.name, async ({ page }) => {
    await page.goto(story.path)
    // await page.waitForSelector('#storybook-root')

    const graph = await page.locator('#storybook-preview-iframe')

    await expect(graph).toHaveScreenshot(
      `${story.name.toLowerCase()}-${process.platform}.png`,
      {
        animations: 'disabled'
      }
    )
  })
})
