const hotelForm = document.getElementById("hotelForm");
hotelForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(hotelForm);
    const hotelId = document.getElementById("hotelId").value;
    
    let url;
    if (hotelId) {
        url = 'http://localhost/flight-full-stack/Back-End/Hotels/update.php';
        formData.append('id', hotelId);
    } else {
        url = 'http://localhost/flight-full-stack/Back-End/Hotels/create.php';
    }

    // Log FormData to console for debugging
    for (let [key, value] of formData.entries()) { 
        console.log(key, value);
    }

    axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
            console.log(response.data);
            hotelForm.reset();
            toastr.success(hotelId ? 'Hotel updated successfully!' : 'Hotel added successfully!');
            window.location.href = '../DisplayAdminHotel.html';
        })
        .catch((error) => {
            console.error(error);
            toastr.error(hotelId ? 'Failed to update hotel' : 'Failed to add new hotel');
        });
});


// Form submission for taxis
const taxiForm = document.getElementById("TaxiForm");
taxiForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(taxiForm);
    const taxiId = document.getElementById("taxiId").value;
    
    let url;
    if (taxiId) {
        url = 'http://localhost/flight-full-stack/Back-End/Taxi/update.php';
        formData.append('id', taxiId);
    } else {
        url = 'http://localhost/flight-full-stack/Back-End/Taxi/create.php';
    }

    axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
            console.log(response.data);
            taxiForm.reset();
            toastr.success(taxiId ? 'Taxi updated successfully!' : 'Taxi added successfully!');
            window.location.href = '../DisplayAdminTaxi.html';
        })
        .catch((error) => {
            console.error(error);
            toastr.error(taxiId ? 'Failed to update taxi' : 'Failed to add new taxi');
        });
});


const flightForm = document.getElementById("flightForm");
flightForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(flightForm);
    const flightData = {};
    formData.forEach((value, key) => {
        flightData[key] = value;
    });

    const flightId = document.getElementById("flightId").value;

    let url;
    if (flightId) {
        url = 'http://localhost/flight-full-stack/Back-End/flight/update.php';
        flightData.id = flightId; // Ensure the ID is included for the update operation
    } else {
        url = 'http://localhost/flight-full-stack/Back-End/flight/create.php';
    }

    axios.post(url, JSON.stringify(flightData), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
            console.log(response.data);
            flightForm.reset();
            toastr.success(flightId ? 'Flight updated successfully!' : 'Flight added successfully!');
            window.location.href = '../DisplayAdminFlights.html';
        })
        .catch((error) => {
            console.error(error);
            toastr.error(flightId ? 'Failed to update flight' : 'Failed to add new flight');
        });
});




// Function to fetch hotel details for editing
const fetchHotelDetails = async (hotelId) => {
    try {
        const response = await axios.get(`http://localhost/flight-full-stack/Back-End/Hotels/readOne.php?id=${hotelId}`);
        const hotel = response.data.hotel;
        if (hotel) {
            document.getElementById("hotelId").value = hotel.hotel_id;
            document.getElementById("hotelName").value = hotel.name || "";
            document.getElementById("hotelCity").value = hotel.city || "";
            document.getElementById("hotelCountry").value = hotel.country || "";
            document.getElementById("hotelAddress").value = hotel.address || "";
            document.getElementById("hotelAvailableRooms").value = hotel.available_rooms || "";
            document.getElementById("hotelPricePerNight").value = hotel.price_per_night || "";
            document.getElementById("hotelRate").value = hotel.rate || "";
        } else {
            toastr.error("Hotel data not found.");
        }
    } catch (error) {
        console.error("Error fetching hotel details:", error);
        toastr.error("Failed to load hotel details.");
    }
};

// Function to fetch taxi details for editing
const fetchTaxiDetails = async (taxiId) => {
    try {
        const response = await axios.get(`http://localhost/flight-full-stack/Back-End/Taxi/readOne.php?id=${taxiId}`);
        const taxi = response.data.taxi;
        if (taxi) {
            document.getElementById("taxiId").value = taxi.taxi_id;
            document.getElementById("taxiName").value = taxi.name || "";
            document.getElementById("taxiPhoneNumber").value = taxi.phone_number || "";
            document.getElementById("taxiCity").value = taxi.city || "";
            document.getElementById("taxiCountry").value = taxi.country || "";
            document.getElementById("taxiAvailableCars").value = taxi.available_cars || "";
            document.getElementById("taxiPricePerKm").value = taxi.price_per_km || "";
            document.getElementById("taxiRate").value = taxi.rate || "";
        } else {
            toastr.error("Taxi data not found.");
        }
    } catch (error) {
        console.error("Error fetching taxi details:", error);
        toastr.error("Failed to load taxi details.");
    }
};

// Function to fetch flight details for editing
const fetchFlightDetails = async (flightId) => {
    try {
        const response = await axios.get(`http://localhost/flight-full-stack/Back-End/flight/readOne.php?id=${flightId}`);
        const flight = response.data.flight;
        if (flight) {
            document.getElementById("flightId").value = flight.flight_id;
            document.getElementById("flightNumber").value = flight.flight_number || "";
            document.getElementById("departureAirportId").value = flight.departure_airport_id || "";
            document.getElementById("arrivalAirportId").value = flight.arrival_airport_id || "";
            document.getElementById("departureTime").value = flight.departure_time || "";
            document.getElementById("arrivalTime").value = flight.arrival_time || "";
            document.getElementById("availableSeats").value = flight.available_seats || "";
            document.getElementById("price").value = flight.price || "";
        } else {
            toastr.error("Flight data not found.");
        }
    } catch (error) {
        console.error("Error fetching flight details:", error);
        toastr.error("Failed to load flight details.");
    }
};

// Check URL parameters to fetch data for editing
document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('hotelId');
    const taxiId = urlParams.get('taxiId');
    const flightId = urlParams.get('flightId');

    if (hotelId) {
        fetchHotelDetails(hotelId);
    }

    if (taxiId) {
        fetchTaxiDetails(taxiId);
    }

    if (flightId) {
        fetchFlightDetails(flightId);
    }
});
