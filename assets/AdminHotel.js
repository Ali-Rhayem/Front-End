// const HotelDetails = async () => {
//     try {
//       const response = await axios.get("http://localhost/flight-full-stack/Back-End/Hotels/readOne.php?id=21");
//       const hotel = response.data.hotels;
      
//       document.getElementById("hotelName").value = hotel.name || "";
//       document.getElementById("hotelCity").value = hotel.city || "";
//       document.getElementById("hotelCountry").value = hotel.country || "";
//       document.getElementById("hotelAddress").value = hotel.address || "";
//       document.getElementById("hotelAvailableRooms").value = hotel.available_rooms || "";
//       document.getElementById("hotelPricePerNight").value = hotel.price_per_night || "";
//       document.getElementById("hotelRate").value = hotel.rate || "";
//     } catch (error) {
//       console.error("There was an error fetching the hotel details:", error);
//       toastr.error("Failed to load hotel details.");
//     }
//   };
  