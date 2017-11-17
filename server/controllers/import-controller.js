var util = require('util');

module.exports = function (app) {

  app.post('/import', function (req, res) {
    var multiparty = require('multiparty');
    res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
    (new multiparty.Form()).parse(req, function (err, fields, files) {
      if (err) {
        console.log('ERROR: ', err.message);
      }
      console.log('TYPE: ', typeof files);
      console.log('FILES: ', files);
      if (files) {
        console.log('FILES: ', files.file[0].path);
      }
      res.writeHead(200, {'content-type': 'multipart/form-data'});
      res.write('received fields:\n\n ' + util.inspect(fields));
      res.write('\n\n');
      res.end('received files:\n\n ' + files);





    });
    // (new multiparty.Form()).parse(req, function (err, fields, files) {
    //     if (err) {
    //         return res.json(400, 'There was a problem uploading your file. Please try again.');
    //     }
    //
    //     try {
    //         var input = files.file[0].path;
    //     } catch (err) {
    //         return res.json(400, 'No upload file selected.');
    //     }
    //
    //     return processGRNmap(input, res, app);
    // });
    // return res.send(200, 'got it ok');
    // console.log(req.body);
  });
};
