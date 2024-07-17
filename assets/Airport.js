const form4 = document.getElementById("AirportForm");

form4.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form4);
    const airportId = document.getElementById("airportId").value;
    
    let url;
    if (airportId) {
        url = `http://localhost/flight-full-stack/Back-End/Airport/update.php`;
        formData.append('id', airportId);
    } else {
        url = `http://localhost/flight-full-stack/Back-End/Airport/create.php`;
    }

    axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
        console.log(response.data);
        form4.reset();
        if (airportId) {
            toastr.success('Airport updated successfully!');
        } else {
            toastr.success('Airport added successfully!');
        }
    })
    .catch((error) => {
        console.error(error);
        if (airportId) {
            toastr.error('Failed to update airport');
        } else {
            toastr.error('Failed to add new airport');
        }
    });
});

const AirportDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id) {
      document.getElementById("airportId").value = id;
      try {
          const response = await axios.get(`http://localhost/flight-full-stack/Back-End/Airport/readOne.php?id=${id}`);
          const airport = response.data.airports; 
          console.log(airport);
          if (airport) {
              document.getElementById("AirportName").value = airport.name || "";
              document.getElementById("AirportCity").value = airport.city || "";
              document.getElementById("AirportCountry").value = airport.country || "";
              document.getElementById("AirportCode").value = airport.code || ""; 
          } else {
              toastr.error("Airport data not found.");
          }
      } catch (error) {
          console.error("There was an error fetching the airport details:", error);
          toastr.error("Failed to load airport details.");
      }
  }
};


document.addEventListener("DOMContentLoaded", AirportDetails);