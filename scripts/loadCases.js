/* eslint dot-notation: "off", no-console: "off" */

const request = require('request');
const rp = require('request-promise');

const baseUrl = 'http://localhost:3000';
const victimIDs = [];
const suspectIDs = [];
const userIDs = [];
const NUM_CASES = 50;

const getVictims = () =>
  rp({
    method: 'GET',
    uri: `${baseUrl}/victims`,
    json: true, // Automatically parses the JSON string in the response
  }).then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      victimIDs.push(data[i]['_id']);
    }
  });

const getSuspects = () =>
  rp({
    method: 'GET',
    uri: `${baseUrl}/suspects`,
    json: true, // Automatically parses the JSON string in the response
  }).then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      suspectIDs.push(data[i]['_id']);
    }
  });

const getUsers = () =>
  rp({
    method: 'GET',
    uri: `${baseUrl}/users`,
    json: true, // Automatically parses the JSON string in the response
  }).then((data) => {
    for (let i = 0; i < data.length; i += 1) {
      userIDs.push(data[i]['_id']);
    }
  });

let drNumCount = 0;

const randomData = (data) => {
  const randomInt = Math.floor(Math.random() * (data.length - 1));
  return data[randomInt];
};

const randomArray = (data) => {
  const randData = [];
  const randomLength = Math.floor(Math.random() * data.length) + 1;
  for (let i = 0; i < randomLength; i += 1) {
    const randomIndex = Math.floor(Math.random() * (data.length - 1));
    randData.push(data[randomIndex]);
  }
  return randData;
};

const randomDate = () =>
  new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));


const randomCase = () => {
  const division = ['Southwest', 'Southeast', '77th Street', 'Harbor'];
  const bureau = ['OSB', 'OCB', 'OWB', 'OVB'];
  const reportingDistrict = ['a', 'b', 'c'];
  const caseStatus = ['Open', 'Closed'];
  const solvabilityFactor = ['Easy', 'Medium', 'Hard'];
  const weaponUsed = ['handgun', 'blunt force', 'unknown', 'rifle', 'bodily force', 'knife'];
  const motive = ['gang', 'unknown', 'robbery', 'narcotics', 'domestic violence',
    'dispute', 'accidental', 'self defense', 'burglary'];
  const address = [
    {
      streetNumber: 30,
      streetName: 'Baker Street',
      city: 'Los Angeles',
      zipCode: 90234,
    },
    {
      streetNumber: 4244,
      streetName: 'Main Street',
      city: 'Los Angeles',
      zipCode: 90222,
    },
    {
      streetNumber: 2343,
      streetName: '5th Avenue',
      city: 'Los Angeles',
      zipCode: 90253,
    },
  ];
  const caseForm = {
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
    victim: randomData(victimIDs),
    address: randomData(address),
    suspects: randomArray(suspectIDs),
  };
  drNumCount += 1;
  return caseForm;
};

Promise.all([getVictims(), getSuspects(), getUsers()])
  .then(() => {
    for (let i = 0; i < NUM_CASES; i += 1) {
      const caseForm = randomCase();
      const caseFormData = JSON.stringify(caseForm);
      const contentLength = caseFormData.length;
      request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/json',
        },
        uri: `${baseUrl}/cases`,
        body: caseFormData,
        method: 'POST',
      }, (err, res, body) => {
        if (err) {
          console.log('err: ', err);
        }
        console.log(`body: ${body}, res: ${res.statusCode}`);
      });
    }
  });
