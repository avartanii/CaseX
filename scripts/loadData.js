/* eslint no-console: "off", dot-notation: "off",
prefer-destructuring: "off", arrow-body-style: "off", comma-dangle: "off" */

const rp = require('request-promise');

const victimIDs = [];
const suspectIDs = [];
const userIDs = [];
const NUM_CASES = 50;

const baseUrl = 'http://localhost:3000';

const victimData = [
  'Jane|Victim|Doe|Female|Brown Hair, Brown Eyes|23',
  'John|Victim|Doe|Male|Red Hair, Blue Eyes|25'
];

const userData = [
  'John|Smith|Doe|123456|Admin|jdoe@gmail.com|wordpass',
  'Margaret|Rachel|Smith|234567|General|msmith@gmail.com|wordpass'
];

const suspectData = [
  'Adam|Suspect|Johnson|Male|29|False|parole',
  'Stacy|Suspect|Greene|Female|23|False|parole'
];

const stringToBoolean = (s) => {
  if (s.toLowerCase() === 'true') {
    return true;
  }
  return false;
};

const createVictims = (token) => {
  const promises = [];
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

    promises.push(rp({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      uri: `${baseUrl}/victims`,
      body: victimFormData,
      method: 'POST',
      // json: true,
    })
      .then((res) => {
        victimIDs.push(JSON.parse(res)['_id']);
      })
      .catch((err) => {
        console.log('err: ', err);
      }));
  });
  return Promise.all(promises);
};

const createSuspects = (token) => {
  const promises = [];
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

    promises.push(rp({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      uri: `${baseUrl}/suspects`,
      body: suspectFormData,
      method: 'POST',
    })
      .then((res) => {
        suspectIDs.push(JSON.parse(res)['_id']);
      })
      .catch((err) => {
        console.log('err: ', err);
      }));
  });
  return Promise.all(promises);
};

const createAuthenticatedUser = () => {
  const data = {
    name: {
      first: 'Admin',
      middle: 'Admin',
      last: 'Admin',
    },
    employeeID: 123,
    permissionLevel: 'Admin',
    email: 'admin@gmail.com',
    password: 'foo',
  };
  const userFormData = JSON.stringify(data);
  const contentLength = userFormData.length;

  return rp({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/json',
    },
    uri: `${baseUrl}/users`,
    body: userFormData,
    method: 'POST',
  })
    .then(() => {
      return rp({
        headers: {
          'Content-Type': 'application/json',
        },
        uri: `${baseUrl}/authenticate`,
        body: userFormData,
        method: 'POST',
      });
    });
};

const createUsers = () => {
  const promises = [];
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

    promises.push(rp({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
      },
      uri: `${baseUrl}/users`,
      body: userFormData,
      method: 'POST',
    }).then((res) => {
      userIDs.push(JSON.parse(res)['_id']);
    }).catch((err) => {
      console.log('err: ', err);
    }));
  });
  return Promise.all(promises);
};


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
  const reportingDistrict = [101, 105, 109, 111, 112];
  const caseStatus = ['Investigation Continued', 'Cleared by Arrest', 'Warrant', 'Justifiable', 'Cleared Other', 'OIS', 'Murder-Suicide', 'Suicide', 'Accidental', 'Natural', 'Undetermined Death'];
  const solvabilityFactor = ['1-High', '2-Medium', '3-Low'];
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

const createCases = (token) => {
  for (let i = 0; i < NUM_CASES - 10; i += 1) {
    const caseForm = randomCase();
    const caseFormData = JSON.stringify(caseForm);
    const contentLength = caseFormData.length;
    rp({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      uri: `${baseUrl}/cases`,
      body: caseFormData,
      method: 'POST',
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  }
};

let token;
createAuthenticatedUser()
  .then((data) => {
    token = JSON.parse(data)['token'];
    console.log('token: ', token);
    Promise.all([createVictims(token), createSuspects(token), createUsers(token)])
      .then(() => {
        createCases(token);
      });
  });
