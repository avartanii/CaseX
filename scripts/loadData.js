var request = require('request');
var baseUrl = 'http://localhost:3000/';

var stringToBoolean = function (s) {
  if (s.toLowerCase() === 'true') {
    return true;
  }
  return false;
};

var victimData = [
  'Jane|Victim|Doe|Female|Brown Hair, Brown Eyes|23',
  'John|Victim|Doe|Male|Red Hair, Blue Eyes|25'
];

victimData.forEach(function (s) {
  var victim = s.split('|');
  var data = {
    victName: {
      first: victim[0],
      middle: victim[1],
      last: victim[2]
    },
    victSex: victim[3],
    victDesc: victim[4],
    victAge: +victim[5]
  };
  var victimFormData = JSON.stringify(data);
  var contentLength = victimFormData.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/json'
    },
    uri: baseUrl + 'victim',
    body: victimFormData,
    method: 'POST'
  }, function (err, res, body) {
    if (err) {
      console.log('err: ', err);
    }
    console.log('body: ' + body + ', res: ' + res.statusCode);
  });
});


var suspectData = [
  'Adam|Suspect|Johnson|Male|29|False|parole',
  'Stacy|Suspect|Greene|Female|23|False|parole'
];

suspectData.forEach(function (s) {
  var user = s.split('|');
  var data = {
    suspName: {
      first: user[0],
      middle: user[1],
      last: user[2]
    },
    suspSex: user[3],
    suspAge: +user[4],
    juvenileTriedAsAdult: stringToBoolean(user[5]),
    supervisedReleaseStatus: user[6]
  };
  var suspectFormData = JSON.stringify(data);
  var contentLength = suspectFormData.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/json'
    },
    uri: baseUrl + 'suspect',
    body: suspectFormData,
    method: 'POST'
  }, function (err, res, body) {
    if (err) {
      console.log('err: ', err);
    }
    console.log('body: ' + body + ', res: ' + res.statusCode);
  });
});



var userData = [
  'John|Smith|Doe|123456|Admin|jdoe@gmail.com|wordpass',
  'Margaret|Rachel|Smith|234567|General|msmith@gmail.com|wordpass'
];

userData.forEach(function (s) {
  var user = s.split('|');
  var data = {
    name: {
      first: user[0],
      middle: user[1],
      last: user[2]
    },
    employeeID: +user[3],
    permissionLevel: user[4],
    email: user[5],
    password: user[6]
  };
  var userFormData = JSON.stringify(data);
  var contentLength = userFormData.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/json'
    },
    uri: baseUrl + 'user',
    body: userFormData,
    method: 'POST'
  }, function (err, res, body) {
    if (err) {
      console.log('err: ', err);
    }
    console.log('body: ' + body + ', res: ' + res.statusCode);
  });
});
