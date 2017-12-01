/* eslint no-loop-func: "off" */
const rp = require('request-promise');
const moment = require('moment');

const baseUrl = 'http://localhost:3000/';


module.exports = (app) => {
  const expires = moment().add('days', 7).valueOf();
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

  function getCases(token, query) {
    return rp({
      headers: {
        'x-access-token': token
      },
      uri: `${baseUrl}cases${query}`,
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
    let query = '';
    if (req.originalUrl.indexOf('?') >= 0) {
      query = `?${req.originalUrl.split('?')[1]}`;
    }
    const token = req.headers['x-access-token'];
    res.set('Expires', expires);
    getCases(token, query).then(xls => res.send(xls));
  });
};
