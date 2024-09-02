const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
       allureCypress(on);
      // integrate cypress-mochawesome-reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: null,
    video: false,
    defaultCommandTimeout: 10000,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "mochawesome-report",
    overwrite: false,
    html: true,
    json: true,
  },
});
