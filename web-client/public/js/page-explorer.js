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

  function loadDataTable() {
    $('#example').DataTable({
      ajax: {
        type: 'GET',
        url: 'http://localhost:3000/cases',
        dataSrc: json => json,
      },
      columnDefs: [
        {
          targets: [4, 5, 8, 12],
          render: $.fn.dataTable.render.moment('x', 'Do MMM YY'),
        },
        {
          targets: [0, 1],
          width: '20px',
        },
      ],
      columns: [
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
        { data: 'weaponUsed' },
        { data: 'motive' },
        { data: 'lastModifiedDate' },
        { data: 'lastModifiedBy' },
        { data: 'victim' },
        { data: 'address' },
        { data: 'lastModifiedBy' },
      ],
    });
  }
  loadDataTable();
});
