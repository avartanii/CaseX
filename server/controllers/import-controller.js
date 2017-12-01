const multiparty = require('multiparty');
const excel2Json = require('node-excel-to-json');
const moment = require('moment');


module.exports = (app) => {
  const expires = moment().add('days', 7).valueOf();
  app.post('/import', (req, res) => {
    res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
    res.set('Expires', expires);
    res.writeHead(200, { 'content-type': 'multipart/form-data' });
    (new multiparty.Form()).parse(req, (err, fields, files) => {
      if (err) {
        res.end(err.message);
      }
      const path = files.file[0].path;
      excel2Json(path, ((error, output) => {
        if (err) {
          res.end(error);
        }
        const key = Object.keys(output);
        res.write(JSON.stringify(output[key]));
        res.end();
      }));
      res.end();
    });
  });
};
