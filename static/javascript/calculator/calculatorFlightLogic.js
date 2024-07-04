/*

Author of this file: Aaron Cunningham

*/

let flightPath;
let map;
let distanceMiles;
let distanceKm;
const flashedMessageError = document.getElementById("flash-message-error");
const flashedMessageSuccess = document.getElementById("flash-message-success");
const METERS_IN_ONE_MILE = 1609.344;

document
  .getElementById("calculateButton")
  .addEventListener("click", calculateFlight);
// Initilises the map on the flight calculator page
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: { lat: 37.77, lng: -122.447 },
  });
}

function calculateFlight() {
  // Clears the previous flash messages
  flashedMessageError.textContent = "";
  flashedMessageError.style.display = "none";
  flashedMessageSuccess.textContent = "";
  flashedMessageSuccess.style.display = "none";
  // Retrieves the trip type value user selected in the form
  const tripType = document.querySelector(
    'input[name="trip_type"]:checked'
  ).value;
  // Retrieves the fuel type value user selected in the form
  const fuelType = document.querySelector(
    'input[name="fuel_type"]:checked'
  ).value;
  // Retrieves the start desination user inputted in the form
  const startDestination = document.getElementById("from").value;
  // Retrieves the end desination user inputted in the form
  const endDestination = document.getElementById("to").value;
  // Initilises the geocoder
  const geocoder = new google.maps.Geocoder();

  geocoder.geocode(
    { address: startDestination },
    (startResult, startStatus) => {
      if (startStatus === "OK" && startResult[0]) {
        // Converts the start address into coordinates
        const startCoordinates = startResult[0].geometry.location;
        geocoder.geocode(
          { address: endDestination },
          (endResult, endStatus) => {
            if (endStatus === "OK" && endResult[0]) {
              // Converts the end address into coordinates
              const endCoordinates = endResult[0].geometry.location;
              // Calculates the distance in miles between the two points
              distanceMiles = calculateDistanceMiles(
                startCoordinates,
                endCoordinates
              );
              // Calculates the distance in km between the two points
              distanceKm = calculateDistanceKm(
                startCoordinates,
                endCoordinates
              );
              // Uses the calculate CO2 function to calculate the CO2 of the journey
              let co2 = calculateCo2Flight(distanceKm, fuelType);
              if (tripType == "Round Trip") {
                co2 = co2 * 2;
                distanceMiles = distanceMiles * 2;
              }
              // Sends the data to the python backend to handle the queries
              sendPython(
                distanceMiles,
                fuelType,
                co2,
                tripType,
                (selectedMode = "Flight")
              );
              // Renders the results of the journey on the calculator page
              flightDataResults(
                startDestination,
                endDestination,
                tripType,
                fuelType,
                distanceMiles,
                co2
              );
              // Clear the previous flight path if they want to add another flight journey straight away
              if (flightPath) {
                flightPath.setMap(null);
              }
              // Sets the points of the start and end coordinates
              flightPath = flightRoute(startCoordinates, endCoordinates);

              // Updates the points of the start and end destination on the map
              flightPath.setMap(map);
              // Changes the position of the map to be in the center of the two points
              const bounds = new google.maps.LatLngBounds();
              bounds.extend(startCoordinates);
              bounds.extend(endCoordinates);
              map.fitBounds(bounds);
              flashedMessageSuccess.textContent =
                "Your journey has been logged";
              flashedMessageSuccess.style.display = "block";
            } else {
              // Error handling if start destination can't be found
              flashedMessageError.textContent =
                "End destination could not be found.";
              flashedMessageError.style.display = "block";
            }
          }
        );
      } else {
        // Error handling if end destination can't be found
        flashedMessageError.textContent =
          "Start destination could not be found.";
        flashedMessageError.style.display = "block";
      }
    }
  );
}

/* 
Returns the distance, in meters, between two LatLngs referenced [https://developers.google.com/maps/documentation/javascript/reference/geometry]
 */
const calculateDistanceMiles = (startCoordinates, endCoordinates) => {
  /* This function calculates the distance between two points on earth using long and lat values
     Returns: the distance in miles
  */
  let distance;
  distance = google.maps.geometry.spherical.computeDistanceBetween(
    startCoordinates,
    endCoordinates
  );
  //Converts the distance from meters into miles
  return distance / METERS_IN_ONE_MILE;
};

const calculateDistanceKm = (startCoordinates, endCoordinates) => {
  /* 
  This function calcualtes the distance between two points on earth using long at lat values
  Returns: the distance in km
  */
  let distance;
  distance = google.maps.geometry.spherical.computeDistanceBetween(
    startCoordinates,
    endCoordinates
  );
  //Converts the distance from meters into km
  return distance / 1000;
};

// Draws a path on the map between two coordinates Referenced [https://developers.google.com/maps/documentation/javascript/examples/polyline-simple]
const flightRoute = (startCoordinates, endCoordinates) => {
  /*
    This function will draw a line on the map fromt eh two points that have been submitted
    Returns: The flight path of the journey
  */
  const flightPath = new google.maps.Polyline({
    path: [startCoordinates, endCoordinates],
    geodesic: true,
    strokeColor: "#4ba847",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });
  return flightPath;
};
