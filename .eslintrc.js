const typeScriptExtensions = ['.ts', '.cts', '.mts', '.tsx'];

const allExtensions = [...typeScriptExtensions, '.js', '.jsx'];

const varOptions = {
    argsIgnorePattern: '^_',
    caughtErrors: 'all',
    caughtErrorsIgnorePattern: '^_',
    destructuredArrayIgnorePattern: '^_',
    varsIgnorePattern: '^_',
    ignoreRestSiblings: true,
};

module.exports = {
    plugins: ['react', 'react-hooks', 'simple-import-sort', '@typescript-eslint', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'airbnb-typescript',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/parsers': {
            '@typescript-eslint/parser': typeScriptExtensions,
        },
        'import/extensions': allExtensions,
        'import/resolver': {
            node: {
                extensions: allExtensions,
                alwaysTryTypes: true,
            },
        },
    },
    env: {
        browser: true,
        node: true,
        es2021: true,
    },

    rules: {
        'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }],

        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-unused-vars': [1, varOptions],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-ts-comment': 'error',

        'react/display-name': 'off',
        'react/jsx-max-props-per-line': [2, { maximum: 6 }],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-props-no-spreading': 'warn',
        'react/jsx-boolean-value': [2, 'never'],
        'react/jsx-uses-vars': [2],
        'react/jsx-curly-brace-presence': [2, { props: 'never' }],
        'react/forbid-component-props': [0],
        'react/react-in-jsx-scope': [0],
        'react/no-unresolved': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        'import/no-cycle': 'error',
        'import/prefer-default-export': 'off',
        'import/extensions': ['error', 'never', { svg: 'always', json: 'always', css: 'always' }],

        'no-undef': 'off',
        'no-console': 'warn',
        'prefer-const': 'warn',
        'no-unused-vars': [1, varOptions],
        'linebreak-style': 'off',
        quotes: [1, 'single'],
        semi: [1, 'always'],
        'id-length': ['error', { min: 2, exceptions: ['_'], properties: 'never' }],
        'max-depth': ['warn', 2],
        'max-len': ['error', 120],

        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
    },
    overrides: [
        {
            files: ['**/src/**/*.{jsx,tsx}'],
            rules: {
                indent: 'off',
            },
        },
        {
            files: ['**/src/**/ui/**/**.tsx'],
            rules: {
                'react/jsx-props-no-spreading': 'off',
            },
        },
        {
            files: ['**/src/**/ui/icons/**.tsx'],
            rules: {
                'max-len': 'off',
            },
        },
        {
            files: ['**/src/**/*.ts'],
            rules: {
                'max-lines': ['error', 400],
            },
        },
        {
            files: ['**/src/**/*.tsx'],
            rules: {
                'max-lines': ['error', 300],
            },
        },
        {
            files: ['**/src/**/*.{ts,tsx}'],
            rules: {
                'simple-import-sort/imports': [
                    'error',
                    {
                        groups: [
                            ['^react', '^@?\\w', '^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
                            ['^\\$?\\w'],
                            [
                                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
                            ],
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            ['^.+\\.s?css$'],
                        ],
                    },
                ],
            },
        },
    ],
};
