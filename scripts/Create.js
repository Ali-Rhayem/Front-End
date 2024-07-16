const form = document.getElementById("hotelForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(form);
    const hotelId = document.getElementById("hotelId").value;
    
    let url;
    if (hotelId) {
        url = `http://localhost/flight-full-stack/Back-End/Hotels/update.php`;
        formData.append('id', hotelId);
    } else {
        url = `http://localhost/flight-full-stack/Back-End/Hotels/create.php`;
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
        form.reset();
        if (hotelId) {
            toastr.success('Hotel updated successfully!');
        } else {
            toastr.success('Hotel added successfully!');
        }
    })
    .catch((error) => {
        console.error(error);
        if (hotelId) {
            toastr.error('Failed to update hotel');
        } else {
            toastr.error('Failed to add new hotel');
        }
    });
});

const HotelDetails = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');
    if (hotelId) {
        document.getElementById("hotelId").value = hotelId;
        try {
            const response = await axios.get(`http://localhost/flight-full-stack/Back-End/Hotels/readOne.php?id=${hotelId}`);
            const hotel = response.data.hotels;
            if (hotel) {
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
            console.error("There was an error fetching the hotel details:", error);
            toastr.error("Failed to load hotel details.");
        }
    }
};

document.addEventListener("DOMContentLoaded", HotelDetails);
