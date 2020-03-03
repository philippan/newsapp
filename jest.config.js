// File jest.config.js

const {defaults} = require('jest-config');

module.exports = {
	  setupFiles: ['./jest.setup.js'],
	  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
	  preset: "jest-puppeteer",
	  globals: {
	      "PATH": "http://localhost:1234"
	  },
};