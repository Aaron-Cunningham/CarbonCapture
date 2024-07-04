/*

Author of this file: Aaron Cunningham

*/

let directionsService;
let directionsRenderer;
let geocoder;
let selectedMode = document.getElementById("mode").textContent.trim();
let selectedTransit = document
  .getElementById("transit_mode")
  .textContent.trim();
//Code referenced from [https://developers.google.com/maps/documentation/javascript/examples/directions-travel-modes#maps_directions_travel_modes-javascript]
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();
  // Initilises the map
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 1,
    center: { lat: 37.77, lng: -122.447 },
  });
  directionsRenderer.setMap(map);

  const calculateButton = document.getElementById("calculateButton");
  calculateButton.addEventListener("click", () => {
    if (selectedMode === "DRIVING") {
      calculateTransit(directionsService, directionsRenderer); // Calculates car emissions
    } else if (selectedMode == "TWO_WHEELER") {
      calculateTransit(directionsService, directionsRenderer);
    } else if (selectedMode === "FLIGHT") {
      calculateFlight(geocoder);
    } else if (selectedTransit === "TRAIN") {
      calculate(directionsService, directionsRenderer, selectedTransit); // Calculates train emissions
    } else if (selectedTransit === "BUS") {
      calculate(directionsService, directionsRenderer, selectedTransit);
    }
  });
}
