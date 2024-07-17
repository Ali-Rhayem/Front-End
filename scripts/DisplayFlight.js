document.addEventListener('DOMContentLoaded', function() {
    let flights = [];

    async function fetchFlights() {
        try {
            const response = await axios.get('http://localhost/flight-full-stack/Back-End/flight/readAll.php');
            const data = response.data;
            const flightsContainer = document.getElementById('flights-container');
            if (data.flights) {
                flights = data.flights;
                displayFlights(flights);
                console.log('Fetched Flights:', flights); // Debugging
            } else {
                flightsContainer.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }

    function displayFlights(flightsToDisplay) {
        const flightsContainer = document.getElementById('flights-container');
        flightsContainer.innerHTML = '';
        flightsToDisplay.forEach(flight => {
            const flightDiv = document.createElement('div');
            flightDiv.classList.add('flight');

            flightDiv.innerHTML = `
                <div class="left">
                    <div>
                        <p class="flightNumber">Flight Number: ${flight.flight_number}</p>
                        <p>Departure: ${flight.departure_airport}</p>
                        <p>Arrival: ${flight.arrival_airport}</p>
                        <p>Departure Time: ${new Date(flight.departure_time).toLocaleString()}</p>
                        <p>Arrival Time: ${new Date(flight.arrival_time).toLocaleString()}</p>
                    </div>
                    <p class="price">$${flight.price}</p>
                </div>
                <div class="right">
                    <div class="buttonContainer">
                        <p>${flight.available_seats} seats left</p>
                        <button class="BookButton" data-flight-id="${flight.flight_id}">
                            Book Now <i class="fa-solid fa-arrow-right-long"></i>
                        </button>
                    </div>
                </div>
            `;
            flightsContainer.appendChild(flightDiv);
        });

        const bookButtons = document.querySelectorAll('.BookButton');
        bookButtons.forEach(button => {
            button.addEventListener('click', function () {
                const flightId = this.getAttribute('data-flight-id');
                sessionStorage.setItem('selectedFlightId', flightId);
                window.location.href = './ConfirmBookingFlight.html';
            });
        });
    }

    document.getElementById('searchInput').addEventListener('input', function() {
        const query = this.value.toLowerCase();
       
        if (query.length > 1) {
            const filteredFlights = flights.filter(flight =>
                flight.flight_number.toLowerCase().includes(query)
            );
           
            displayFlights(filteredFlights);
        } else {
            displayFlights(flights);
        }
    });

    fetchFlights();
});
