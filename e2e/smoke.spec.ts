import { test, expect, type Locator, type Page } from '@playwright/test';
import routes from './routes.json' with { type: 'json' };

interface Route {
  path: string;
  heading?: string;
  button?: string;
}

// Every page must render an element from the JavaScript bundle (a heading, or a
// button on pages without one) without an uncaught error or a console error.
function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console.error: ${message.text()}`);
  });
  return errors;
}

function marker(page: Page, route: Route): Locator {
  if (route.heading) return page.getByRole('heading', { name: route.heading, exact: true });
  if (route.button) return page.getByRole('button', { name: route.button, exact: true }).first();
  throw new Error(`${route.path}: routes.json needs "heading" or "button"`);
}

for (const route of routes as Route[]) {
  test(`${route.path} renders`, async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto(route.path);
    await expect(marker(page, route)).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('the menu opens a tool and the rules switch to the glossary', async ({ page }) => {
  const errors = collectErrors(page);
  await page.goto('/');
  await page.getByRole('link', { name: /^Battle Sim/ }).click();
  await expect(page).toHaveURL(/\/tools\/battle$/);
  await expect(page.getByRole('button', { name: 'Advanced Cards', exact: true })).toBeVisible();
  await page.goto('/tools/rules');
  await page.getByRole('button', { name: 'Glossary', exact: true }).click();
  await expect(page.getByRole('button', { name: '1. Golden Rules' })).toBeHidden();
  expect(errors).toEqual([]);
});
