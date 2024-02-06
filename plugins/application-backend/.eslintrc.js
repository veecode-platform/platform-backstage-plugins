module.exports = require('@backstage/cli/config/eslint-factory')(__dirname, {
    rules: {
      'testing-library/prefer-screen-queries': "off",
      "no-param-reassign": 0,
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "no-ex-assign":["off"],       // error - axios
      'jest/expect-expect': ["off"],
      "@typescript-eslint/no-useless-constructor": "off",
      "consistent-return": "off" // return a value at the end of async method 
    },
  });