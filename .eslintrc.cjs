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
  // overrides: [],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // TypeScript 파일에 대한 추가적인 규칙을 여기에 설정할 수 있습니다.
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // ecmaVersion: "latest",
    ecmaVersion: 2023, // 최신 버전을 명시한 걸로 수정 -지수-
    sourceType: "module",
    // project: "./tsconfig.json",
    project: ["./tsconfig.json", "./vite.config.ts"],
  },
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    // vite.config.ts 파일에 대해 'vite' 모듈이 개발 의존성에 있어도 ESLint가 경고를 생성하지 않게 추가한 룰 : 41번 라인
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/vite.config.ts"] },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off", // jsx 내부에서 spread 연산자 사용 가능
    "max-len": ["error", { code: 120 }],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        some: ["nesting", "id"],
      },
    ],
  },
};
