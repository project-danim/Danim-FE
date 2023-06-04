module.exports = {
  // env: {
  //   browser: true,
  //   es2021: true,
  // },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // "plugin:prettier/recommended",
    // 👉 eslint-plugin-prettier : eslint에서 prettier를 실행할 수 있도록 플러그인을 추가함
    // eslint와 prettier를 함께 사용하면서 일관된 코드 스타일을 유지할 수 있도록 함
    "prettier",
    // 👉 eslint-config-prettier : eslint와 prettier의 설정 충돌을 해결하기 위해 eslint 의 규칙을 비활성화
    // eslint의 규칙을 유지하면서 prettier의 스타일 가이드를 따를 수 있게 해줌
    // => 일반적으로는 eslint-config-prettier를 사용하여 eslint의 규칙을 비활성화하는 방식이 더 일반적이지만,
    // eslint-plugin-prettier를 사용하여 eslint에서 prettier를 실행하는 방식도 유용할 수 있음
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // project: "./tsconfig.json",
    project: ["./tsconfig.json", "./vite.config.ts"],
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "max-len": ["error", { code: 120 }],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        some: ["nesting", "id"],
      },
    ],

  },
};
