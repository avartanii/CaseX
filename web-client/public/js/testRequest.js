function submitTestRequest() {
    axios.get('http://localhost:3000/cases')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
}
