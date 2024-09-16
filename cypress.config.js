const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
  env: {
    user: 'admin@zombieplus.com',
    pass: 'pwd123',
    API_URL: 'http://localhost:3333'
  }
});
