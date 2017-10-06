module.exports = function (app) {

  app.post('/upload', function(req, res) {
    var multiparty = require("multiparty");
    res.header("Access-Control-Allow-Origin", app.get("corsOrigin"));
    (new multiparty.Form()).parse(req, function(err, fields, files) {
      console.log(files);
    })
    // (new multiparty.Form()).parse(req, function (err, fields, files) {
    //     if (err) {
    //         return res.json(400, "There was a problem uploading your file. Please try again.");
    //     }
    //
    //     try {
    //         var input = files.file[0].path;
    //     } catch (err) {
    //         return res.json(400, "No upload file selected.");
    //     }
    //
    //     if (path.extname(input) !== ".xlsx") {
    //         return res.json(400, "This file cannot be loaded because:<br><br> The file is not in a format GRNsight can read." +
    //         "<br>Please select an Excel Workbook (.xlsx) file. Note that Excel 97-2003 Workbook (.xls) files are not " +
    //         " able to be read by GRNsight. <br><br>SIF and GraphML files can be loaded using the importer under File > Import." +
    //         " Additional information about file types that GRNsight supports is in the Documentation.");
    //     }
    //     return processGRNmap(input, res, app);
    // });
    return res.send(200, "got it ok");
    // console.log(req.body);
  });
}
