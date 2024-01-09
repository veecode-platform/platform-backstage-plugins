module.exports = require('@backstage/cli/config/eslint-factory')(__dirname);

module.exports={
    "env": {
        "es2021": true,
        "browser": true,
        "amd": true,
        "node": true
      },
      "settings": {
        "react": {
          "version": "detect"
        }
      },
      "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
      ],
      "parser": "@typescript-eslint/parser",
      "parserOptions": {
        "ecmaFeatures": {
          "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
      },
      "plugins": ["react", "react-hooks", "@typescript-eslint"],
      "rules": {
          "@typescript-eslint/no-unused-vars": [
            "warn",
            {
              "vars": "all",
              "args": "after-used",
              "ignoreRestSiblings": false
            }
          ],
          "@typescript-eslint/ban-types": [
            "error",
            {
              "extendDefaults": true,
              "types": {
                "{}": false
              }
            }
          ],
        "react-hooks/rules-of-hooks": "error",
        "react/prop-types": "off",
        "react-hooks/exhaustive-deps": "off" ,
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": ["off"],
        "no-shadow": "off",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": ["off"],
        '@typescript-eslint/no-var-requires': 0
      }
  }