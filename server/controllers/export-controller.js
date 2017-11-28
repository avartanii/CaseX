/* eslint no-loop-func: "off" */
const rp = require('request-promise');
const moment = require('moment');

const baseUrl = 'http://localhost:3000/';
let drNumCount = 0;
const suspectIDs = [];
const userIDs = [];

module.exports = (app) => {
  const expires = moment().add('days', 7).valueOf();

  function randomData(data) {
    const randomInt = Math.floor(Math.random() * (data.length - 1));
    return data[randomInt];
  }

  function randomArray(data) {
    const randomDataArray = [];
    const randomLength = Math.floor(Math.random() * data.length) + 1;
    for (let i = 0; i < randomLength; i += 1) {
      const randomIndex = Math.floor(Math.random() * (data.length - 1));
      randomDataArray.push(data[randomIndex]);
    }
    return randomDataArray;
  }

  function randomDate() {
    return new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
  }

  function randomCase() {
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
      }
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
      victim: randomData(userIDs),
      address: randomData(address),
      suspects: randomArray(suspectIDs)
    };
    drNumCount += 1;
    return caseForm;
  }

  function convertArrayOfObjectsToCSV(args) {
    let result;
    let ctr;
    let data;
    let dataToAdd;

    data = args.data || null;
    if (data === null || !data.length) {
      return null;
    }
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }

    const columnDelimiter = args.columnDelimiter || ',';
    const lineDelimiter = args.lineDelimiter || '\n';

    const keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    for (let i = 0; i < data.length; i += 1) {
      ctr = 0;
      for (let k = 0; k < keys.length; k += 1) {
        if (ctr > 0) {
          result += columnDelimiter;
        }
        dataToAdd = data[i][keys[k]];
        if (Array.isArray(dataToAdd)) {
          let finalDataToAdd = '';
          dataToAdd.forEach((elem, index, arr) => {
            if (elem !== Object(elem)) {
              finalDataToAdd += `${arr[index].charAt(0).toUpperCase()}${arr[index].slice(1)}\r`;
            } else if (elem === Object(elem)) {
              if (Object.prototype.hasOwnProperty.call(elem, '_id')) {
                finalDataToAdd += `${elem['_id']}\r`;
              }
            }
          });
          finalDataToAdd = `\u0022${finalDataToAdd.substring(0, finalDataToAdd.length - 1)}\u0022`;
          dataToAdd = finalDataToAdd;
        } else if (dataToAdd === Object(dataToAdd)) {
          if (Object.prototype.hasOwnProperty.call(dataToAdd, '_id')) {
            dataToAdd = dataToAdd['_id'];
          } else if (Object.prototype.hasOwnProperty.call(dataToAdd, 'streetName')) {
            dataToAdd = `\u0022${dataToAdd.streetNumber} ${dataToAdd.streetName}\r${dataToAdd.city}\r${dataToAdd.zipCode}\u0022`;
          }
        }
        result += dataToAdd;
        ctr += 1;
      }
      result += lineDelimiter;
    }

    return result;
  }

  function downloadCSV(args) {
    let csv = convertArrayOfObjectsToCSV({
      data: args.data
    });
    if (csv === null) {
      return undefined;
    }

    const filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }
    const data = encodeURI(csv);

    return { data, filename };
  }

  function getCases(token) {
    const caseForm = randomCase();
    const caseFormData = JSON.stringify(caseForm);
    const contentLength = caseFormData.length;
    return rp({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      uri: `${baseUrl}cases`,
      body: caseFormData,
      method: 'GET'
    }).then((data) => {
      const xls = downloadCSV({
        data,
        filename: 'data.csv'
      });
      return xls;
    });
  }

  app.get('/export', (req, res) => {
    res.set('Expires', expires);
    const token = req.headers['x-access-token'];
    getCases(token).then(xls => res.send(xls));
  });
};
