const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'g3z5sx',
  retries: 1,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
