$(document).ready(function () {
  $('#example').DataTable( {
    'ajax': {
      'type': 'GET',
      'url': 'http://localhost:3000/cases',
      'dataSrc': function (json) {
        return json;
      }
    },
    'columnDefs': [{
      targets: [4, 5, 8, 12],
      render: $.fn.dataTable.render.moment( 'x', 'Do MMM YY' )
    }],
    'columns': [
      { 'data': 'drNumber' },
      { 'data': 'masterDrNumber' },
      { 'data': 'division' },
      { 'data': 'bureau' },
      { 'data': 'dateOccured' },
      { 'data': 'dateReported' },
      { 'data': 'reportingDistrict' },
      { 'data': 'caseStatus' },
      { 'data': 'caseStatusDate' },
      { 'data': 'solvabilityFactor' },
      { 'data': 'weaponUsed' },
      { 'data': 'motive' },
      { 'data': 'lastModifiedDate' },
      { 'data': 'lastModifiedBy' },
      { 'data': 'victim' },
      { 'data': 'address' },
      { 'data': 'lastModifiedBy' },
    ]
  });
});
