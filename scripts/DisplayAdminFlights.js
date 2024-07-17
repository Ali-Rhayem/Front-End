document.addEventListener('DOMContentLoaded', function() {
    async function fetchAirport(airportId) {
        try {
            const response = await axios.get(`http://localhost/flight-full-stack/Back-End/airport/readOne.php?id=${airportId}`);
            if (response.data.airports) {
                return response.data.airports;
            } else {
                console.error(`No airport found with id ${airportId}`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching airport with id ${airportId}:`, error);
            return null;
        }
    }
    
    async function fetchFlights() {
        try {
            const response = await axios.get('http://localhost/flight-full-stack/Back-End/flight/readAll.php');
            const data = response.data;
            const flightsContainer = document.getElementById('flights-container');
            if (data.flights) {
                for (const flight of data.flights) {
                    const departureAirport = await fetchAirport(flight.departure_airport_id);
                    const arrivalAirport = await fetchAirport(flight.arrival_airport_id);
                    
                    if (departureAirport && arrivalAirport) {
                        const flightDiv = document.createElement('div');
                        flightDiv.classList.add('flight');
    
                        flightDiv.innerHTML = `
                            <div class="left">
                                <div>
                                    <p class="flightName">${flight.flight_number}</p>
                                    <p>${departureAirport.name} to ${arrivalAirport.name}</p>
                                </div>
                                <p class="price">$${flight.price}</p>
                            </div>
                            <div class="right">
                                <i class="fa-solid fa-x delete" data-flight-id="${flight.flight_id}"></i>
                                <div class="buttonContainer">
                                    <p>${flight.available_seats} seats left</p>
                                    <button class="BookButton" data-flight-id="${flight.flight_id}">
                                        Edit <i class="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                </div>
                            </div>
                        `;
    
                        const deleteIcon = flightDiv.querySelector('.delete');
    
                        deleteIcon.addEventListener('click', async function() {
                            const flightId = deleteIcon.getAttribute('data-flight-id');
                            try {
                                const deleteResponse = await axios.post(
                                    'http://localhost/flight-full-stack/Back-End/flight/delete.php',
                                    { id: flightId },
                                    { headers: { 'Content-Type': 'application/json' } }
                                );
                                if (deleteResponse.data.message) {
                                    flightDiv.remove();
                                } else {
                                    console.error('Failed to delete flight:', deleteResponse.data.error);
                                }
                            } catch (error) {
                                console.error('Error deleting flight:', error);
                            }
                        });
    
                        const editButton = flightDiv.querySelector('.BookButton');
                        editButton.addEventListener('click', function() {
                            const flightId = editButton.getAttribute('data-flight-id');
                            window.location.href = `Admin/admin.html?flightId=${flightId}`; 
                        });
    
                        flightsContainer.appendChild(flightDiv);
                    } else {
                        console.error(`One of the airports could not be fetched for flight ${flight.flight_number}`);
                    }
                }
            } else {
                flightsContainer.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
    }
    
    fetchFlights();
    
});
