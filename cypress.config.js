const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',  
      overwrite: true,              
      html: true,                 
      json: false,                   
      reportFilename: 'index.html',  
    },
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