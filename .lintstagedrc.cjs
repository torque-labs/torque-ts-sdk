module.exports = {
  // Run type-check on changes to TypeScript files
  './src/**/*.ts?(x)': () => 'npm run typecheck',
  // Lint & Prettify TS and JS files
  './src/**/*.(ts|tsx|js)': (filenames) => [
    `npm run lint ${filenames.join(' ')}`,
    `npm run prettier --write ${filenames.join(' ')}`,
  ],
};
