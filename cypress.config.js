const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    url: 'https://rahulshettyacademy.com/angularpractice/'
  },
  projectId: "i925a6",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});