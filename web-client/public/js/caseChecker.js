let hasMoreData;
let totalNumber;

const checkCases = function check() {
  const currentCase = allCases.shift();
  hasMoreData = allCases.length > 0;
  fillData(currentCase);
  updateSubmitButton();
  updateProgressBar();
};

function updateProgressBar() {
  if (totalNumber > 1 && $('#progress-row').is(':hidden')) {
    $('#progress-row').show();
  }
  const left = totalNumber - allCases.length;
  const progress = (left / totalNumber) * 100;
  $('#progress-bar').attr({ 'aria-valuenow': progress, style: `width:${progress}%` });
  $('#progress-bar-sr-span').text(`${progress}% Complete`);
  $('#progress-bar-span').text(`Case ${left} of ${totalNumber}`);
}
