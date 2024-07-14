const form = document.getElementById("hotelForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  axios
    .post(
      "http://localhost/FlightManagementSystem/Hotels/create.php",
      formData
    )
    .then((response) => {
      console.log(response.data);
      form.reset();
      toastr.success('Hotel added Successfully!');
    })
    .catch((error) => {
      console.error(error);
      toastr.error('Failed to add new hotel');
    });
});