const form = document.getElementById("hotelBookingForm");
const urlParams = new URLSearchParams(window.location.search);
const hotelId = urlParams.get('id');


document.getElementById('hotel_id').value = hotelId;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  axios
    .post(
      "http://localhost/flight-full-stack/Back-End/Hotel_Bookings/create.php",
      formData
    )
    .then((response) => {
      console.log(response.data);
      form.reset();
      toastr.success('Hotel Booking added Successfully!');
    })
    .catch((error) => {
      console.error(error);
      toastr.error('Failed to add new booking');
    });
});