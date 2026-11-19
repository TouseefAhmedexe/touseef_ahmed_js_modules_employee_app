import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      eqeqeq: "error",
      curly: "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];
