module.exports = function (app) {

  app.post('/upload', function (req, res) {
    var multiparty = require('multiparty');
    res.header('Access-Control-Allow-Origin', app.get('corsOrigin'));
    (new multiparty.Form()).parse(req, function (err, fields, files) {
      console.log(files);
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
    return res.send(200, 'got it ok');
    // console.log(req.body);
  });
};
