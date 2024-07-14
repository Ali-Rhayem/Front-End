document.getElementById("TaxiForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    axios
      .post(
        "http://localhost/FlightManagementSystem/Taxi/create.php",
        formData
      )
      .then(function(response) {
        console.log(response.data);
        document.getElementById("TaxiForm").reset();
        toastr.success('Taxi added Successfully!');
      })
      .catch(function(error) {
        console.error(error);
        toastr.error('Failed to add new taxi');
      });
  });