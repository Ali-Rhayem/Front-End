document.addEventListener('DOMContentLoaded', function() {
    async function fetchTaxis() {
        try {
            const response = await axios.get('http://localhost/flight-full-stack/Back-End/Taxi/readAll.php');
            const data = response.data;
            const taxisContainer = document.getElementById('taxis-container');
            if (data.taxi) {
                data.taxi.forEach(taxi => {
                    const taxiDiv = document.createElement('div');
                    taxiDiv.classList.add('taxi');

                    let starsHtml = '';
                    for (let i = 0; i < taxi.rate; i++) {
                        starsHtml += '<i class="fa-solid fa-star filledstar"></i>';
                    }
                    for (let i = 0; i < 5 - taxi.rate; i++) {
                        starsHtml += '<i class="fa-regular fa-star emptystar"></i>';
                    }

                    taxiDiv.innerHTML = `
                        <div class="information">
                            <div class="namediv">
                                <p>${taxi.name}</p>
                            </div>
                            <div class="details">
                                <p>${taxi.phone_number}</p>
                                <p>${taxi.city}, ${taxi.country}</p>
                                <div class="lastContainer">
                                    <div class="left">${starsHtml}</div>
                                    <div class="right">
                                        <i class="fa-solid fa-x delete" data-taxi-id="${taxi.taxi_id}"></i>
                                        <button class="BookButton">
                                            Edit <i class="fa-solid fa-arrow-right-long"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

                    const deleteIcon = taxiDiv.querySelector('.delete');

                    deleteIcon.addEventListener('click', async function() {
                        const taxiId = deleteIcon.getAttribute('data-taxi-id');
                        try {
                            const deleteResponse = await axios.post(
                                'http://localhost/flight-full-stack/Back-End/Taxi/delete.php',
                                { id: taxiId },
                                { headers: { 'Content-Type': 'application/json' } }
                            );
                            if (deleteResponse.data.message) {
                                taxiDiv.remove();
                            } else {
                                console.error('Failed to delete taxi:', deleteResponse.data.error);
                            }
                        } catch (error) {
                            console.error('Error deleting taxi:', error);
                        }
                    });
                    taxisContainer.appendChild(taxiDiv);
                });
            } else {
                taxisContainer.innerHTML = `<p>${data.message}</p>`;
            }
        } catch (error) {
            console.error('Error fetching taxis:', error);
        }
    }

    fetchTaxis();
});
