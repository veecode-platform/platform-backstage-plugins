module.exports = {
  root: true,
  env: {
    browser: true, // Habilita variáveis globais do navegador (window, document, etc.)
    node: true,    // Habilita variáveis globais do Node.js (module, process, etc.)
    es2021: true,  // Permite sintaxe ES2021 (como const, let, etc.)
  },
  extends: "eslint:recommended", // Usa regras recomendadas do ESLint
  parserOptions: {
    ecmaVersion: 2021, // Define a versão do ECMAScript a ser usada
    sourceType: "module", // Permite o uso de import/export
  },
};
