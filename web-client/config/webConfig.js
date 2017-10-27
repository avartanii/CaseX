var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/casex_dev',
    host: 'localhost',
    port: 27017,
    url: 'http://' + this.host + '/' + this.port,
    secret: 'foo',
    root: rootPath,
    app: {
      name: 'CaseX'
    }
  },

  test: {
    db: 'mongodb://localhost/casex_test',
    host: 'localhost',
    port: 27017,
    url: 'http://' + this.host + '/' + this.port,
    secret: 'foo',
    root: rootPath,
    app: {
      name: 'CaseX'
    }
  }
};
