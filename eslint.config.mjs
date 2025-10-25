import globals from "globals";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import refreshPlugin from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";

export default [
    { ignores: ["dist/", "node_modules/"] },
  js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': hooksPlugin,
            refresh: refreshPlugin,
            'unused-imports': unusedImports,
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            ...hooksPlugin.configs.recommended.rules,
            "refresh/only-export-components": "warn",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            // Prefer plugin for unused checks to catch and (optionally) auto-fix imports
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "error",
                { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
            ],
            "no-extra-boolean-cast": "off",
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    },
];