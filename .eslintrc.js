// module.exports = {
//   root: true,
//   extends: '@react-native-community',
// };
module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "react-native/no-inline-styles": 0,
    "react/no-did-mount-set-state":0,
    // "indent": ["error", 1],
    // "indent": ["error", "tab"],
    "quotes": [1, "double", { "avoidEscape": true }],
    // "prettier/prettier": ["error", { "singleQuote": false, "parser": "flow" }]
  }
};
