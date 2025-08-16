export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  testMatch: ["<rootDir>/tests/**/*.test.(ts|tsx)"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/main.tsx",
    "!src/vite-env.d.ts",
  ],
};

// import jsWithTs from "ts-jest/presets/js-with-ts-esm/jest-preset.js";

/** @type {import('jest').Config} */
// export default {
//   ...jsWithTs,
//   testEnvironment: "jest-environment-jsdom",
//   extensionsToTreatAsEsm: [".ts", ".tsx"],
//   transform: {
//     "^.+\\.tsx?$": [
//       "ts-jest",
//       {
//         useESM: true,
//         tsconfig: "./tsconfig.app.json",
//       },
//     ],
//   },
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   testMatch: ["**/tests/**/*.test.(ts|tsx)"],
// }; //
