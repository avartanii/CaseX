var querystring = require('querystring');
var request = require('request');

var form = {
  drNumber: '120873',
  masterDrNumber: '123',
  division: 'Southwest',
  bureau: 'OSB',
  reportingDistrict: 'a',
  caseStatus: 'Open',
  victim: '59ea608274225c44e088efcc'
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

request({
  headers: {
    'Content-Length': contentLength,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  uri: 'http://localhost:3000/case',
  body: formData,
  method: 'POST'
}, function (err, res, body) {
  if (err) {
    console.log('err: ', err);
  }
  console.log(body);
});
