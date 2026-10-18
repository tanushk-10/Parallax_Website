import { test, expect } from '@playwright/test';
const routes = [
  '/',
  '/robot/',
  '/team/',
  '/story/',
  '/outreach/',
  '/sponsors/',
  '/resources/',
  '/contact/',
];
test('all routes export, have SEO, valid media, and no runtime errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('title')).not.toBeEmpty();
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.{30,}/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://parallaxrobotics.net' + route,
    );
    expect(await page.locator('main section').count()).toBeGreaterThanOrEqual(4);
    await page.locator('img').evaluateAll(async (imgs) => {
      await Promise.all(
        imgs.map((img) => {
          (img as HTMLImageElement).loading = 'eager';
          return (img as HTMLImageElement).decode().catch(() => {});
        }),
      );
    });
    const broken = await page
      .locator('img')
      .evaluateAll((imgs) =>
        imgs
          .filter(
            (i) =>
              !i.hasAttribute('alt') ||
              !(i as HTMLImageElement).complete ||
              !(i as HTMLImageElement).naturalWidth,
          )
          .map((i) => i.getAttribute('src')),
      );
    expect(broken).toEqual([]);
  }
  expect(errors).toEqual([]);
});
test('all specified breakpoints fit and team grid responds', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [360, 640, 768, 1024, 1280, 1536]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      const dimensions = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scroll, route + ' at ' + width).toBeLessThanOrEqual(dimensions.width);
      if (route === '/team/') {
        expect(await page.locator('.member-card').count()).toBe(6);
        const columns = await page
          .locator('.team-grid')
          .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
        expect(columns).toBe(width >= 1024 ? 3 : width >= 640 ? 2 : 1);
      }
    }
  }
});
test('published roster order, data-derived filters, and join card', async ({ page }) => {
  await page.goto('/team/');
  const names = [
    'Pranav Srinivasan',
    'Tanush Kandpal',
    'Tanush Lingala',
    'Vihaan Rajagopal',
    'Shankar Datta Reddy',
    'Sanjay Parisa',
  ];
  expect(await page.locator('.member-info h3').allTextContents()).toEqual(names);
  await expect(page.getByRole('button', { name: /^Build/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Code/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Outreach/ })).toHaveCount(0);
  await page.getByRole('button', { name: /^Code/ }).click();
  await expect(page.locator('.member-card')).toHaveCount(3);
  await expect(page.getByRole('link', { name: /This could be you/ })).toHaveAttribute(
    'href',
    '/contact/',
  );
  await page.getByRole('button', { name: /^All/ }).click();
  await expect(page.locator('.member-card')).toHaveCount(6);
});
test('mobile menu traps focus, closes with Escape, and navigates', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  const dialog = page.getByRole('dialog', { name: 'Navigation' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Shift+Tab');
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Open navigation menu' })).toBeFocused();
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await dialog.getByRole('link', { name: 'The team' }).click();
  await expect(page).toHaveURL(/\/team/);
  await expect(page.locator('h1')).toContainText('Different minds.');
});
test('robot lightbox has keyboard navigation, close and focus return', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/robot/');
  const first = page.getByRole('button', { name: 'Open v1 image placeholder' });
  await first.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog')).toHaveAttribute('aria-label', 'Robot evolution v2');
  await page.keyboard.press('Tab');
  expect(await page.getByRole('dialog').evaluate((el) => el.contains(document.activeElement))).toBe(
    true,
  );
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(first).toBeFocused();
});
test('contact validates and provides an honest email fallback', async ({ page }) => {
  await page.goto('/contact/');
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.locator('.field-error')).toHaveCount(4);
  await page.getByLabel('Your name').fill('Website test');
  await page.getByLabel('Your email').fill('test@example.com');
  await page.getByLabel('What’s on your mind?').fill('Preview inquiry');
  await page
    .getByLabel('Tell us a little more')
    .fill('This local test message is never transmitted.');
  await page.getByRole('button', { name: 'Prepare email' }).click();
  await expect(page.getByRole('status')).toContainText('has not been sent');
  await expect(page.getByRole('link', { name: /Open your email app/ })).toHaveAttribute(
    'href',
    /^mailto:parallaxrobotics7@gmail.com\?subject=Preview%20inquiry/,
  );
});
test('session intro, transitions, downloads, reduced motion, and custom 404', async ({
  page,
  request,
}) => {
  await page.goto('/');
  await page.waitForTimeout(2400);
  await expect(page.locator('.preloader')).toBeHidden();
  expect(await page.evaluate(() => sessionStorage.getItem('parallax-intro'))).toBe('1');
  await page.locator('.desktop-nav').getByRole('link', { name: 'The robot' }).click();
  await expect(page).toHaveURL(/\/robot/);
  await expect(page.locator('h1')).toContainText('Ideas take');
  await expect(page.locator('.preloader')).toBeHidden();
  for (const url of [
    '/docs/parallax-sponsorship-packet.pdf',
    '/docs/parallax-team-one-pager.pdf',
  ]) {
    const r = await request.get(url);
    expect(r.status()).toBe(200);
    expect((await r.body()).toString().startsWith('%PDF')).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/story/');
  await expect(page.locator('.custom-cursor')).toBeHidden();
  expect(
    await page
      .locator('.story-chapter')
      .evaluateAll((els) => els.every((el) => getComputedStyle(el).position === 'relative')),
  ).toBe(true);
  const r = await page.goto('/lost-midfield/');
  expect(r?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('Midfield.');
});
test('record desktop and mobile review images', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(3500);
  await page.screenshot({ path: 'test-results/home-desktop.png' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
});
test('desktop pinned features, timeline and story respond to scroll', async ({ page }) => {
  await page.goto('/robot/');
  await page.waitForTimeout(700);
  const features = page.locator('.feature-viewport');
  await expect(features.locator('..')).toHaveClass(/pin-spacer/);
  const start = await features.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 900), start);
  await expect
    .poll(() =>
      page
        .locator('.feature-track')
        .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41),
    )
    .toBeLessThan(-100);
  const timeline = page.locator('.build-timeline');
  await expect(timeline.locator('..')).toHaveClass(/pin-spacer/);
  const timelineStart = await timeline.evaluate(
    (el) => el.getBoundingClientRect().top + window.scrollY,
  );
  await page.evaluate((y) => window.scrollTo(0, y + 900), timelineStart);
  await expect
    .poll(() =>
      page
        .locator('.build-track')
        .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41),
    )
    .toBeLessThan(-100);
  await page.goto('/story/');
  await page.waitForTimeout(700);
  const story = page.locator('.story-narrative');
  await expect(story.locator('..')).toHaveClass(/pin-spacer/);
  const storyStart = await story.evaluate((el) => el.getBoundingClientRect().top + window.scrollY);
  await page.evaluate((y) => window.scrollTo(0, y + 1300), storyStart);
  await expect
    .poll(() =>
      page
        .locator('.story-chapter')
        .nth(2)
        .evaluate((el) => Number(getComputedStyle(el).opacity)),
    )
    .toBeGreaterThan(0);
});
test('desktop 3D scene and pointer depth run without console warnings', async ({ page }) => {
  const messages: string[] = [];
  page.on('pageerror', (e) => messages.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'warning' || m.type() === 'error') messages.push(m.text());
  });
  await page.goto('/');
  await expect(page.locator('.hero-object')).toHaveClass(/scene-ready/, { timeout: 15000 });
  await expect(page.locator('.webgl-concept canvas')).toBeVisible();
  await page.mouse.move(1100, 400);
  await expect
    .poll(() =>
      page
        .locator('.hero-visual')
        .evaluate((el) => Math.abs(new DOMMatrix(getComputedStyle(el).transform).m41)),
    )
    .toBeGreaterThan(1);
  expect(messages).toEqual([]);
});
