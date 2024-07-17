document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const taxiDivs = document.querySelectorAll('.taxi');
    taxiDivs.forEach(div => {
        const taxiName = div.querySelector('.namediv p').innerText.toLowerCase();
        if (taxiName.includes(query)) {
            div.style.display = 'flex';
        } else {
            div.style.display = 'none';
        }
    });
});

async function DisplayTaxis() {
    try {
        const response = await axios.get('http://localhost/flight-full-stack/Back-End/Taxi/readAll.php');
        const data = response.data;
        const taxisContainer = document.getElementById("taxis-container");

        if (data.taxi) {
            data.taxi.forEach(t => {
                const taxiDiv = document.createElement('div');
                taxiDiv.classList.add('taxi');
                let starsHtml = '';
                for (let i = 0; i < t.rate; i++) {
                    starsHtml += '<i class="fa-solid fa-star filledstar"></i>';
                }
                for (let i = 0; i < 5 - t.rate; i++) {
                    starsHtml += '<i class="fa-regular fa-star emptystar"></i>';
                }
                taxiDiv.innerHTML = `
                    <div class="information">
                        <div class="namediv">
                            <p>${t.name}</p>
                        </div>
                        <div class="details">
                            <p>${t.phone_number}</p>
                            <p>${t.city}, ${t.country}</p>
                             <div class="lastContainer">
                                <div class="left">${starsHtml}</div>
                                <div class="right">
                                    <button class="BookButton" data-taxi-id="${t.taxi_id}">
                                        Book Now <i class="fa-solid fa-arrow-right-long"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                taxisContainer.appendChild(taxiDiv);
            });

          
            const bookButtons = document.querySelectorAll('.BookButton');
            bookButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const taxiId = this.getAttribute('data-taxi-id');
                    sessionStorage.setItem('selectedTaxiId', taxiId);
                    window.location.href = './ConfirmBookingTaxi.html';
                });
            });
        }
    } catch (error) {
        console.error('Error fetching taxis:', error);
    }
}

document.addEventListener('DOMContentLoaded', DisplayTaxis);