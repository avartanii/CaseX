window.InputController = (() => {
  return {
    init: () => {

      const formToJSON = elements => [].reduce.call(elements, (data, element) => {

        data[element.name] = element.value;
        return data;

      }, {});

      const handleFormSubmit = event => {

        const data = formToJSON(form.elements);

        // Trying Ajax:
        $.ajax({
          type: 'POST',
          url: "http://localhost:3000/case",
          data: JSON.stringify(data, null, "  "),
          contentType: "application/json",
          dataType: "json",
          accept: "application/json",
          processData: false,
          contentType: false,
          crossDomain: true, // Added
          success: function(data){
            alert(data);
          },
          complete: function () {
            console.log("DEBUG: Found data:")
            console.log(JSON.stringify(data, null, "  "));;
          }
        });

        // Trying request:
        // request('http://localhost:3000/case', { json: data }, (err, res, body) => {
        //   if (err) { return console.log(err); }
        //   console.log(body.url);
        //   console.log(body.explanation);
        // });

        // Trying Axios:
        // axios.post('http://localhost:3000/case', {firstName: 'joe'})
        //   .then(function(response) {
        //     console.log(response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });

      }

      const form = document.getElementsByClassName('caseForm')[0]
      form.addEventListener('submit', handleFormSubmit);

      $('#button-submit-forms').on('click', function(){
        handleFormSubmit();
      })
      
    }

  };

})();
