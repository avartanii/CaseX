var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/casex_dev',
    url: 'http://localhost:3000',
    root: rootPath,
    corsOrigin: "http://localhost:3001",
    app: {
      name: 'CaseX'
    },
    secret: 'foo'
  },

  test: {
    db: 'mongodb://localhost/casex_test',
    url: 'http://localhost:3000',
    root: rootPath,
    app: {
      name: 'CaseX'
    },
    secret: 'foo'
  },

  production: { }
};
