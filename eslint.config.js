import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: ["dist/", "node_modules/"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    // Regra de camadas (docs/architecture.md): domain/ é o núcleo e não depende
    // de nenhuma outra camada. Não cobre import() dinâmico.
    files: ["src/domain/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              regex: "(^|/)(application|infrastructure|interface)(/|$)",
              message:
                "domain/ não pode importar application/, infrastructure/ nem interface/. Defina uma porta (interface) em domain/ e implemente-a fora.",
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
];
