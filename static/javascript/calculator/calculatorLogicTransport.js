/*

Author of this file: Aaron Cunningham

*/
const flashedMessageError = document.getElementById("flash-message-error");
const flashedMessageSuccess = document.getElementById("flash-message-success");
function calculateTransit(directionsService, directionsRenderer) {
  // Clears the previous flash messages
  flashedMessageError.textContent = "";
  flashedMessageError.style.display = "none";
  flashedMessageSuccess.textContent = "";
  flashedMessageSuccess.style.display = "none";
  // Retrieves the transport mode embedded in the HTML
  let selectedMode = document.getElementById("mode").textContent.trim();
  directionsService
    .route({
      origin: document.getElementById("from").value, // Gets inputted data from start destination form
      destination: document.getElementById("to").value, // // Gets inputted data from end destination form
      travelMode: google.maps.TravelMode[selectedMode], // Sets default mode as driving
      optimizeWaypoints: true,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      let distanceKm = response.routes[0].legs[0].distance.value / 1000; // Retrieves the distance of the trip
      let distanceMiles = distanceKm / 1.609344; // Converts the distance from km to miles
      let tripType = document.querySelector(
        'input[name="trip_type"]:checked'
      ).value;
      const fuelType = document.querySelector(
        'input[name="fuel_type"]:checked'
      ).value;

      const startDestination = document.querySelector(
        'input[name="start_destination"]'
      ).value;
      const endDestination = document.querySelector(
        'input[name="end_destination"]'
      ).value;
      if (selectedMode == "DRIVING") {
        const mpg = parseFloat(
          document.querySelector('input[name="mpg"]').value
        );
        co2 = carEmissions(distanceMiles, mpg, fuelType, tripType);
        if (tripType == "Round Trip") {
          co2 = co2 * 2;
          distanceMiles = distanceMiles * 2;
        }
        sendPython(
          distanceMiles,
          fuelType,
          co2,
          tripType,
          (selectedMode = "Car")
        ); //sends the data over to python flask
        displayCarResults(
          startDestination,
          endDestination,
          tripType,
          fuelType,
          distanceMiles,
          co2
        );
        flashedMessageSuccess.textContent = "Your journey has been logged";
        flashedMessageSuccess.style.display = "block";
      } else if (selectedMode == "TWO_WHEELER") {
        co2 = motorbikeEmissions(fuelType, distanceKm, tripType);
        if (tripType == "Round Trip") {
          co2 = co2 * 2;
          distanceMiles = distanceMiles * 2;
        }
        sendPython(
          distanceMiles,
          fuelType,
          co2,
          tripType,
          (selectedMode = "Motorbike")
        ); //sends the data over to python flask
        displayMotorbikeResults(
          startDestination,
          endDestination,
          tripType,
          fuelType,
          distanceMiles,
          co2
        );
        flashedMessageSuccess.textContent = "Your journey has been logged";
        flashedMessageSuccess.style.display = "block";
      }
    })
    // Error handling. Will flash a message to the user if error occurs
    .catch((error) => {
      if (error.code === "ZERO_RESULTS") {
        flashedMessageError.textContent =
          "Sorry no route could be found, please try again later.";
        flashedMessageError.style.display = "block";
      } else if (error.code === "REQUEST_DENIED") {
        flashedMessageError.textContent = "Sorry but your request was denied.";
        flashedMessageError.style.display = "block";
      } else if (error.code === "INVALID_REQUEST") {
        flashedMessageError.textContent =
          "Address may be missing or entered incorrectly.";
        flashedMessageError.style.display = "block";
      } else if (error.code === "NOT_FOUND") {
        flashedMessageError.textContent =
          "Either the start, end or both destinations are incorrect.";
        flashedMessageError.style.display = "block";
      } else if (error.code === "MAX_ROUTE_LENGTH_EXCEEDED") {
        flashedMessageError.textContent =
          "The route is too and cannot be calculated.";
        flashedMessageError.style.display = "block";
      } else {
        window.alert("Direction request has failed: " + error);
      }
    });
}
