import { expect, test } from '@playwright/test'

test('Smoke test for Home page', async ({ page }) => {
  await page.goto('/')
  expect(true).toBe(true)
})
