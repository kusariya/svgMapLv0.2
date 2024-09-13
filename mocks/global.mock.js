//https://stackoverflow.com/questions/73607410/referenceerror-structuredclone-is-not-defined-using-jest-with-nodejs-typesc

// global.mock.js
global.structuredClone = v => JSON.parse(JSON.stringify(v));
