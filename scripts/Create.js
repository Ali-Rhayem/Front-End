const hotelForm = document.getElementById("hotelForm");

hotelForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(hotelForm);
    axios
        .post("http://localhost/flight-full-stack/Back-End/Hotels/create.php", formData)
        .then((response) => {
            console.log(response.data);
            hotelForm.reset();
            toastr.success('Hotel added successfully!');
        })
        .catch((error) => {
            console.error(error);
            toastr.error('Failed to add new hotel');
        });
});

document.getElementById("TaxiForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    
    axios.post("http://localhost/flight-full-stack/Back-End/Taxi/create.php", formData)
        .then(function(response) {
            console.log(response.data);
            document.getElementById("TaxiForm").reset();
            toastr.success('Taxi added successfully!');
        })
        .catch(function(error) {
            console.error(error);
            toastr.error('Failed to add new taxi');
        });
});

document.getElementById("flightForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const jsonData = {};

  formData.forEach((value, key) => {
      jsonData[key] = value;
  });

  axios.post("http://localhost/flight-full-stack/Back-End/flight/create.php", jsonData)
      .then(function(response) {
          console.log(response.data);
          document.getElementById("flightForm").reset();
          toastr.success('Flight added successfully!');
      })
      .catch(function(error) {
          console.error(error);
          toastr.error('Failed to add new flight');
      });
});
