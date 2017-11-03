window.CaseController = (() => {
  return {
    init: () => {
      console.log("Running!");
      axios.get('http://localhost:3000/case/2').then(function(response) {
        console.log(response);
      })
    }

  };

})();
