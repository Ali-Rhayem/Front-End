document.addEventListener('DOMContentLoaded', function() {
    async function fetchHotels() {
        try {
            const response = await axios.get('http://localhost/flight-full-stack/Back-End/Hotels/readAll.php');
            const data = response.data;
            const hotelsContainer = document.getElementById('hotels-container');
            if (data.hotels) {
                data.hotels.forEach(hotel => {
                    const hotelDiv = document.createElement('div');
                    hotelDiv.classList.add('hotel');

                    let starsHtml = '';
                    for (let i = 0; i < hotel.rate; i++) {
                        starsHtml += '<i class="fa-solid fa-star filledstar"></i>';
                    }
                    for (let i = 0; i < 5 - hotel.rate; i++) {
                        starsHtml += '<i class="fa-regular fa-star emptystar"></i>';
                    }

                    hotelDiv.innerHTML = `
                    <div class="left">
                        <div>
                        <p class="hotelName">${hotel.name}</p>
                        <p>${hotel.city}, ${hotel.country}, ${hotel.address}</p>
                        </div>
                        <p class="price">$${hotel.price_per_night}</p>
                    </div>
                    <div class="right">
                        <div>${starsHtml}</div>
                        <div class="buttonContainer">
                        <p>${hotel.available_rooms} rooms left</p>
                        <button class="BookButton">
                            Book Now <i class="fa-solid fa-arrow-right-long"></i>
                            </button>
                        </div>
                    </div>
                    `;
                    hotelsContainer.appendChild(hotelDiv);
                });
            } else {
                hotelsContainer.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    }

    fetchHotels();
});
