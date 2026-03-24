// https://jestjs.io/docs/en/configuration
module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: [`${__dirname}/__tests__/setup.js`],
  testPathIgnorePatterns: [`${__dirname}/__tests__/setup.js`],
};
