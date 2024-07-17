document.addEventListener("DOMContentLoaded", function () {
  async function fetchAirport() {
    try {
      const response = await axios.get(
        "http://localhost/flight-full-stack/Back-End/Airport/readAll.php"
      );
      const data = response.data;
      const airportsContainer = document.getElementById("airports-container");
      if (data.airports) {
        data.airports.forEach((airport) => {
          const airportDiv = document.createElement("div");
          airportDiv.classList.add("airport");
          airportDiv.setAttribute('data-airport-id', airport.airport_id);
          airportDiv.innerHTML = `
            <div class="left">
              <div>
                <p class="hotelName">${airport.name}</p>
                <p>${airport.city}, ${airport.country}</p>
              </div>
              <p class="price">${airport.code}</p>
            </div>
            <div class="right">
              <i class="fa-solid fa-x delete" data-airport-id="${airport.airport_id}"></i>
              <div class="buttonContainer">
                <button class="BookButton" data-airport-id="${airport.airport_id}">
                  Edit <i class="fa-solid fa-arrow-right-long"></i>
                </button>
              </div>
            </div>
          `;

          const deleteIcon = airportDiv.querySelector('.delete');
          deleteIcon.addEventListener('click', async function () {
            const id = deleteIcon.getAttribute('data-airport-id'); 
            try {
              const deleteResponse = await axios.post(
                'http://localhost/flight-full-stack/Back-End/Airport/delete.php',
                { id: id },
                { headers: { 'Content-Type': 'application/json' } }
              );
              if (deleteResponse.data.message) {
                airportDiv.remove();
              } else {
                console.error('Failed to delete airport:', deleteResponse.data.message);
              }
            } catch (error) {
              console.error('Error:', error.response ? error.response.data : error.message);
            }
          });

          const bookButton = airportDiv.querySelector('.BookButton');
          bookButton.addEventListener('click', function() {
            const id = bookButton.getAttribute('data-airport-id'); 
            window.location.href = `Admin/admin.html?id=${id}`; 
          });

          airportsContainer.appendChild(airportDiv);
        });
      } else {
        airportsContainer.innerHTML = `<p>${data.message}</p>`;
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
    }
  }

  fetchAirport();
});
