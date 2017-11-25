/* eslint no-console: "off" */
const request = require('request');
const fs = require('fs');

const baseUrl = 'http://localhost:3000';

const victimData = [
  'Jane|Victim|Doe|Female|Brown Hair, Brown Eyes|23',
  'John|Victim|Doe|Male|Red Hair, Blue Eyes|25',
];

const userData = [
  'John|Smith|Doe|123456|Admin|jdoe@gmail.com|wordpass',
  'Margaret|Rachel|Smith|234567|General|msmith@gmail.com|wordpass',
];

const suspectData = [
  'Adam|Suspect|Johnson|Male|29|False|parole',
  'Stacy|Suspect|Greene|Female|23|False|parole',
];

const stringToBoolean = (s) => {
  if (s.toLowerCase() === 'true') {
    return true;
  }
  return false;
};

const createVictims = (token) => {
  victimData.forEach((s) => {
    const victim = s.split('|');
    const data = {
      victName: {
        first: victim[0],
        middle: victim[1],
        last: victim[2],
      },
      victSex: victim[3],
      victDesc: victim[4],
      victAge: +victim[5],
    };
    const victimFormData = JSON.stringify(data);
    const contentLength = victimFormData.length;

    request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      uri: `${baseUrl}/victims`,
      body: victimFormData,
      method: 'POST',
    }, (err, res, body) => {
      if (err) {
        console.log('err: ', err);
      }
      console.log(`body: ${body}, res: ${res.statusCode}`);
    });
  });
};

const createSuspects = (token) => {
  suspectData.forEach((s) => {
    const user = s.split('|');
    const data = {
      suspName: {
        first: user[0],
        middle: user[1],
        last: user[2],
      },
      suspSex: user[3],
      suspAge: +user[4],
      juvenileTriedAsAdult: stringToBoolean(user[5]),
      supervisedReleaseStatus: user[6],
    };
    const suspectFormData = JSON.stringify(data);
    const contentLength = suspectFormData.length;

    request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      uri: `${baseUrl}/suspects`,
      body: suspectFormData,
      method: 'POST',
    }, (err, res, body) => {
      if (err) {
        console.log('err: ', err);
      }
      console.log(`body: ${body}, res: ${res.statusCode}`);
    });
  });
};

const createUsers = (token) => {
  userData.forEach((s) => {
    const user = s.split('|');
    const data = {
      name: {
        first: user[0],
        middle: user[1],
        last: user[2],
      },
      employeeID: +user[3],
      permissionLevel: user[4],
      email: user[5],
      password: user[6],
    };
    const userFormData = JSON.stringify(data);
    const contentLength = userFormData.length;

    request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      uri: `${baseUrl}/users`,
      body: userFormData,
      method: 'POST',
    }, (err, res, body) => {
      if (err) {
        console.log('err: ', err);
      }
      console.log(`body: ${body}, res: ${res.statusCode}`);
    });
  });
};

// const myArgs = process.argv.slice(2);
// try {
//   if (myArgs.length > 0) {
//     const token = myArgs[0];
//     createUsers(token);
//     createVictims(token);
//     createSuspects(token);
//   } else {
//     throw new Error('Enter token as a command line argument');
//   }
// } catch (e) {
//   console.error(e);
// }

const token = fs.readFileSync('scripts/token.txt', 'utf8');
createUsers(token);
createVictims(token);
createSuspects(token);
