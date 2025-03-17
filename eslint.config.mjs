import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "plugin:@typescript-eslint/recommended"),
  // 设置全局变量
  {
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
  },
  // 自定义 ESLint 规则
  {
    rules: {
      "no-unused-vars": [
        "warn", // 等价于 1，警告但不报错
        {
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
];

export default eslintConfig;
