const path = require("path");

const config = {
  "env": {
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  "rules": {
    "no-console": "error",
    "import/no-unresolved": "error"
  },
  "settings": {
    "import/resolver": {
      "node": {
        paths: ["src"],
        "alias": {
          "map": [
            ["@", "./src"],
          ]
        },
        "extensions": [".js", ".jsx"]
      }
    }
  }
}

module.exports = config;
