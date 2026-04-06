import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // Bu satırı ekleyerek Cypress'e Vite kullanmasını söylüyoruz
    baseUrl: 'http://localhost:5173',
    
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
