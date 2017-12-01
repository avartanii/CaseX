/* eslint comma-dangle: "off" */
$(document).ready(() => {
  $('#query2Checkbox').change(() => {
    const enabled = $('#query2Checkbox').prop('checked');
    $('#query2Attribute').attr('disabled', !enabled);
    $('#query2Comparator').attr('disabled', !enabled);
    $('#query2Value').attr('disabled', !enabled);
  });
  $('#query3Checkbox').change(() => {
    const enabled = $('#query3Checkbox').prop('checked');
    $('#query3Attribute').attr('disabled', !enabled);
    $('#query3Comparator').attr('disabled', !enabled);
    $('#query3Value').attr('disabled', !enabled);
  });
  $('#query4Checkbox').change(() => {
    const enabled = $('#query4Checkbox').prop('checked');
    $('#query4Attribute').attr('disabled', !enabled);
    $('#query4Comparator').attr('disabled', !enabled);
    $('#query4Value').attr('disabled', !enabled);
  });
  $('#query5Checkbox').change(() => {
    const enabled = $('#query5Checkbox').prop('checked');
    $('#query5Attribute').attr('disabled', !enabled);
    $('#query5Comparator').attr('disabled', !enabled);
    $('#query5Value').attr('disabled', !enabled);
  });

  function loadDataTable(query) {
    const uri = 'http://localhost:3000/cases' + query;
    console.log(uri);
    const token = window.sessionStorage.getItem('userInfo-token');
    $('#example').DataTable({
      destroy: true,
      ajax: {
        type: 'GET',
        url: uri,
        headers: {
          'x-access-token': token,
        },
        dataSrc: json => json,
      },
      columnDefs: [
        {
          targets: [5, 6, 9, 13],
          render: $.fn.dataTable.render.moment('x', 'Do MMM YY'),
        },
        {
          targets: [0, 1],
          width: '20px',
        },
      ],
      columns: [
        {
          targets: -1,
          data: null,
          defaultContent: '<button>Click!</button>'
        },
        { data: 'drNumber' },
        { data: 'masterDrNumber' },
        { data: 'division' },
        { data: 'bureau' },
        { data: 'dateOccured' },
        { data: 'dateReported' },
        { data: 'reportingDistrict' },
        { data: 'caseStatus' },
        { data: 'caseStatusDate' },
        { data: 'solvabilityFactor' },
        { data: 'weaponUsed[, ]' },
        { data: 'motive[, ]' },
        { data: 'lastModifiedDate' },
        { data: 'lastModifiedBy.email' },
        { data: 'victim.victName.first' },
        { data: 'address' },
        { data: 'suspects[0].suspName.first' },
      ],
    });

    // https://datatables.net/examples/ajax/null_data_source.html
    $('#example tbody').on('click', 'button', () => {
      alert('Hello');
    });
  }
  // default data table loads with no query
  loadDataTable('');

  $('#submit-query').on('click', () => {
    // /cases?drNumber={"lt": 100, "gt": 30}&bureau=OSB
    let query = '/?';
    const a = $('#query1Attribute').val();
    const c = $('#query1Comparator').val();
    const v = $('#query1Value').val();
    if (c === '=') {
      query = query + a + c + v;
    } else {
      query = `${query}${a}={"${c}":${+v}}`;
    }
    console.log(query);
    loadDataTable(query);
  });
});
