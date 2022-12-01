module.exports = {
  extends: [
    "plugin:storybook/recommended",
    "@yext/eslint-config/typescript-react",
  ],
  ignorePatterns: ["lib", "coverage"],
  overrides: [
    {
      files: ["**/*.{test,stories}.*"],
      rules: {
        "react-perf/jsx-no-new-array-as-prop": "off",
        "react-perf/jsx-no-new-function-as-prop": "off",
        "react-perf/jsx-no-new-object-as-prop": "off",
      },
    },
  ],
};
