const ES_PACKAGES_TO_TRANSFORM = [];

/** @type {import('jest').Config} */
const config = {
  collectCoverageFrom: ['src/**/*.ts', '!src/**/schema.ts', '!src/**/types.ts'],
  reporters: ['default', 'jest-junit'],
  // Allow TS sources that use `.js` extensions in ESM-style imports to resolve to `.ts` files in tests
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
        },
      },
    ],
  },
  transformIgnorePatterns: [
    `node_modules/(?!(${ES_PACKAGES_TO_TRANSFORM.join('|')}))/node_modules/.+\\.js`,
  ],
};

export default config;
