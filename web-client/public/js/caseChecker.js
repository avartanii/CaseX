let hasMoreData;

const checkCases = function check() {
  const currentCase = allCases.shift();
  hasMoreData = allCases.length > 0;
  console.log('CASE: ', currentCase);
  fillData(currentCase);
  updateSubmitButton();
};
