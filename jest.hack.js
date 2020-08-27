const fs = require('fs');
const path = require('path');

// WORKAROUND for performance issue with ts-jest on Windows
// When this is fixed, turn isolatedModules off in jest.config.ts
// https://github.com/kulshekhar/ts-jest/issues/259

var jestBuilderPath = path.join(__dirname, 'node_modules', 'jest', 'src', 'builders', 'jest', 'jest.impl.js');
let jestBuilder = fs.readFileSync(jestBuilderPath, { encoding: 'utf8' });

if (jestBuilder.indexOf('isolatedModules') < 0) {
  console.log('Applying Jest hacks for Windows');
  jestBuilder = jestBuilder.replace('var tsJestConfig = {', 'var tsJestConfig = {\n\t\t\tisolatedModules: true,');
  fs.writeFileSync(jestBuilderPath, jestBuilder);
}
