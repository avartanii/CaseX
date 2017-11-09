// var Cases = require('../models/cases');
var json2xls = require('json2xls');
var request = require('request');
var rp = require('request-promise');
var fs = require('fs');
var baseUrl = 'http://localhost:3000/';
var drNumCount = 0;
var victimIDs = [];
var suspectIDs = [];
var userIDs = [];
var exportString;
var xls;

module.exports = function (app) {

  var getVictims = function () {
    return rp({
      method: 'GET',
      uri: baseUrl + 'victims',
      json: true, // Automatically parses the JSON string in the response
    }).then(function (data) {
      for (var i = 0; i < data.length; i++) {
        victimIDs.push(data[i]['_id']);
      }
    });
  };

  var getSuspects = function () {
    return rp({
      method: 'GET',
      uri: baseUrl + 'suspects',
      json: true, // Automatically parses the JSON string in the response
    }).then(function (data) {
      for (var i = 0; i < data.length; i++) {
        suspectIDs.push(data[i]['_id']);
      }
    });
  };

  var getUsers = function () {
    return rp({
      method: 'GET',
      uri: baseUrl + 'users',
      json: true, // Automatically parses the JSON string in the response
    }).then(function (data) {
      for (var i = 0; i < data.length; i++) {
        userIDs.push(data[i]['_id']);
      }
    });
  };

  var randomData = function (data) {
    var randomInt = Math.floor(Math.random() * (data.length - 1));
    return data[randomInt];
  };

  var randomArray = function (data) {
    var randomData = [];
    var randomLength = Math.floor(Math.random() * data.length) + 1;
    for (var i = 0; i < randomLength; i++) {
      var randomIndex = Math.floor(Math.random() * (data.length - 1));
      randomData.push(data[randomIndex]);
    }
    return randomData;
  };

  var randomDate = function () {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
  };

  var randomCase = function () {
    var division = ['Southwest', 'Southeast', '77th Street', 'Harbor'];
    var bureau = ['OSB', 'OCB', 'OWB', 'OVB'];
    var reportingDistrict = ['a', 'b', 'c'];
    var caseStatus = ['Open', 'Closed'];
    var solvabilityFactor = ['Easy', 'Medium', 'Hard'];
    var weaponUsed = ['handgun', 'blunt force', 'unknown', 'rifle', 'bodily force', 'knife'];
    var motive = ['gang', 'unknown', 'robbery', 'narcotics', 'domestic violence',
      'dispute', 'accidental', 'self defense', 'burglary'];
    var address = [
      {
        streetNumber: 30,
        streetName: 'Baker Street',
        city: 'Los Angeles',
        zipCode: 90234
      },
      {
        streetNumber: 4244,
        streetName: 'Main Street',
        city: 'Los Angeles',
        zipCode: 90222
      },
      {
        streetNumber: 2343,
        streetName: '5th Avenue',
        city: 'Los Angeles',
        zipCode: 90253
      },
    ];
    var caseForm = {
      drNumber: drNumCount,
      masterDrNumber: drNumCount,
      division: randomData(division),
      bureau: randomData(bureau),
      dateOccured: randomDate(),
      dateReported: randomDate(),
      reportingDistrict: randomData(reportingDistrict),
      caseStatus: randomData(caseStatus),
      solvabilityFactor: randomData(solvabilityFactor),
      weaponUsed: randomArray(weaponUsed),
      motive: randomArray(motive),
      lastModifiedBy: randomData(userIDs),
      victim: randomData(userIDs),
      address: randomData(address),
      suspects: randomArray(suspectIDs)
    };
    drNumCount++;
    return caseForm;
  };

  var convertArrayOfObjectsToCSV = function (args) {
    var result;
    var ctr;
    var keys;
    var columnDelimiter;
    var lineDelimiter;
    var data;

    data = args.data || null;
    if (data === null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    for (var i = 0; i < data.length; i++) {
      ctr = 0;
      for (var k = 0; k < keys.length; k++) {
        if (ctr > 0) {
          result += columnDelimiter;
        }

        result += data[i][keys[k]];
        ctr++;
      }
      result += lineDelimiter;
    }

    // data.forEach(function (item) {
    //   ctr = 0;
    //   keys.forEach(function (key) {
    //     if (ctr > 0) {
    //       result += columnDelimiter;
    //     }
    //
    //     result += item[key];
    //     ctr++;
    //   });
    //   result += lineDelimiter;
    // });

    return result;
  };

  var downloadCSV = function (args) {
    var data;
    var filename;
    // var link;
    var csv = convertArrayOfObjectsToCSV({
      data: args.data // ************************************
    });
    if (csv === null) {
      return;
    }

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    return {
      data: data,
      filename: filename
    };
  };

  Promise.all([getVictims(), getSuspects(), getUsers()])
    .then(function () {
      for (var i = 0; i < 10; i ++) {
        var caseForm = randomCase();
        var caseFormData = JSON.stringify(caseForm);
        var contentLength = caseFormData.length;
        request({
          headers: {
            'Content-Length': contentLength,
            'Content-Type': 'application/json'
          },
          uri: baseUrl + 'cases',
          body: caseFormData,
          method: 'GET'
        }, function (err, res, body) {
          if (err) {
            console.log('err: ', err);
          }
          xls = downloadCSV({
            data: body,
            filename: 'data.csv'
          });
          // console.log('body: ' + body + ', res: ' + res.statusCode);
        });
      }
    });

  app.get('/export', function (req, res) {
    console.log(req.body);
    // res.send('here is your spreadsheet!');
    res.send(xls);
  });

};
