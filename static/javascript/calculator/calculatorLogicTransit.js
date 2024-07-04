/*

Author of this file: Aaron Cunningham

*/
const flashedMessageError = document.getElementById("flash-message-error");
const flashedMessageSuccess = document.getElementById("flash-message-success");
function calculate(directionsService, directionsRenderer, selectedTransit) {
  // Clears the previous flash messages
  flashedMessageError.textContent = "";
  flashedMessageError.style.display = "none";
  selectedMode = document.getElementById("mode").textContent.trim();
  selectedTransit = document.getElementById("transit_mode").textContent.trim();
  directionsService
    .route({
      origin: document.getElementById("from").value,
      destination: document.getElementById("to").value,
      travelMode: google.maps.TravelMode[selectedMode],
      optimizeWaypoints: true,
      transitOptions: {
        // Selects the correct transit [train or bus]
        modes: [selectedTransit],
      },
    })
    .then((response) => {
      // Checks that the response from the Google API is OK
      if (response.status === "OK") {
        // Sets the directions
        directionsRenderer.setDirections(response);
        let distanceKm = response.routes[0].legs[0].distance.value / 1000; // Retrieves the distance of the trip
        let distanceMiles = distanceKm / 1.609344; // Converts the distance from km to miles
        let tripType = document.querySelector(
          'input[name="trip_type"]:checked'
        ).value;
        const startDestination = document.querySelector(
          'input[name="start_destination"]'
        ).value;
        const endDestination = document.querySelector(
          'input[name="end_destination"]'
        ).value;
        if (selectedTransit == "TRAIN") {
          // If statement for Train
          let co2 = calculateTrainCo2(distanceMiles, tripType);
          if (tripType == "Round Trip") {
            co2 = co2 * 2;
            distanceMiles = distanceMiles * 2;
          }
          // Sends the data to be retrieved in the python backend
          sendPython(
            distanceMiles,
            (fuelType = "National Rail"),
            co2,
            tripType,
            (selectedMode = "Train")
          );
          // This will render the results of the calculations on the page
          displayTrainResults(
            startDestination,
            endDestination,
            tripType,
            distanceMiles,
            co2
          );
          // Lets the user know their journey has been logged if successful
          flashedMessageSuccess.textContent = "Your journey has been logged";
          flashedMessageSuccess.style.display = "block";
        } else if (selectedTransit == "BUS") {
          const fuelType = document.querySelector(
            'input[name="fuel_type"]:checked'
          ).value;
          // Calculates round trip emissions
          let co2 = calculateBusCo2(distanceMiles, fuelType, tripType);
          if (tripType == "Round Trip") {
            co2 = co2 * 2;
            distanceMiles = distanceMiles * 2;
          }
          // Sends the data to the backend of python to handle the queries
          sendPython(
            distanceMiles,
            fuelType,
            co2,
            tripType,
            (selectedMode = "Bus")
          );
          // Renders the results of the journey on the page for the user to view
          displayBusResults(
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
          "Address may be missing or entered incorrectly.";
        flashedMessageError.style.display = "block";
      } else {
        flashedMessageError.textContent = error;
        flashedMessageError.style.display = "block";
      }
    });
}
