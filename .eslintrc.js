module.exports = {
    env: {
        es2021: true,
        node: true,
        jest: true
    },
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'react', 'react-hooks', 'simple-import-sort'],
    rules: {
        'simple-import-sort/imports': [
            2,
            {
                groups: [
                    [
                        '^react', // Packages. `react` related packages come first.
                        '^@?\\w', // packages from node_modules
                        '^\\u0000', // Side effect imports.
                        '^src/(api|app|components|context|hooks|utils)(/.*|$)',
                        '^\\.', // relative imports. Anything that starts with a dot.
                        '^\\.\\.(?!/?$)',
                        '^\\.\\./?$', // Parent imports. Put `..` last.
                        '^\\./(?=.*/)(?!/?$)',
                        '^\\.(?!/?$)',
                        '^\\./?$', // Other relative imports. Put same-folder imports and `.` last.
                        '^.+\\.s?css$' // Style imports.
                    ]
                ]
            }
        ],
        'arrow-body-style': 0,
        curly: [2, 'all'],
        'prettier/prettier': [2, { endOfLine: 'auto' }],
        'jsx-quotes': [2, 'prefer-single'],
        'max-len': [1, 120],
        'no-console': [2, { allow: ['debug', 'error', 'info', 'warn'] }],
        'sort-imports': 0,
        'no-confusing-arrow': 0,
        eqeqeq: [2, 'always'],
        'prefer-template': 1,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': 0,
        'import/prefer-default-export': 0,
        'import/order': 0,
        'react/button-has-type': 1,
        'react/function-component-definition': 0,
        'react/jsx-filename-extension': [2, { extensions: ['.ts', '.tsx', '.js', '.jsx'] }],
        'react/require-default-props': [1, { ignoreFunctionalComponents: true }],
        'react/self-closing-comp': 2,
        'react-hooks/rules-of-hooks': 2,
        '@typescript-eslint/member-ordering': [2, { default: ['field'] }],
        '@typescript-eslint/no-empty-interface': 1,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-non-null-assertion': 1,
        '@typescript-eslint/no-unused-vars': [
            1,
            {
                ignoreRestSiblings: true,
                varsIgnorePattern: '^h$',
                argsIgnorePattern: '^_'
            }
        ],
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/adjacent-overload-signatures': 1,
        '@typescript-eslint/restrict-plus-operands': 2
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.js'],
            parserOptions: {
                project: ['./tsconfig.json']
            }
        }
    ],
    settings: {
        react: {
            version: 'detect'
        }
    }
};
