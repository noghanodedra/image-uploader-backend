module.exports = {
  rootDir: ".",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^models(.*)$": "<rootDir>/app/models/$1",
    "^config(.*)$": "<rootDir>/app/config/$1",
    "^helpers(.*)$": "<rootDir>/app/helpers/$1",
    "^services(.*)$": "<rootDir>/app/services/$1",
    "^routes(.*)$": "<rootDir>/app/routes/$1",
  },
};
//./node_modules/.bin/jest --clearCache