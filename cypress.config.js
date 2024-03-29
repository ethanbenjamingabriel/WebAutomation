const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'g3z5sx',
  retries: 1,
  defaultCommandTimeout: 5000,
  e2e: {
    baseUrl: 'https://staging.script-runner.com',
    setupNodeEvents(on, config) {},
  },
});
