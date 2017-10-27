var querystring = require('querystring');
var request = require('request');
var baseUrl = 'http://localhost:3000/';

var caseData = [
  '123314234234|456|Southwest',
  '23412443242|234|Southwest'
];

var form = {
  drNumber: '120873',
  masterDrNumber: '123',
  division: 'Southwest',
  bureau: 'OSB',
  notes: 'note',
  dateOccured: '2008-10-09',
  dateReported: '2000-10-30',
  reportingDistrict: 'a',
  caseStatus: 'Open',
  caseStatusDate: '',
  solvabilityFactor: 'Easy',
  weaponUsed: 'handgun',
  motive: 'a',
  lastModifiedDate: '2009-3-29',
  lastModifiedBy: '',
  victim: '59ea608274225c44e088efcc',
  address: '',
  suspects: ['a', 'b', 'c']
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
