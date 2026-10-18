import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
  },
  reporter: [['list']],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
  },
});
