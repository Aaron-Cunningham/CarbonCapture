/*

Author of this file: Aaron Cunningham

*/

// Function for sending data to Python Flask backend referenced [https://www.geeksforgeeks.org/pass-javascript-variables-to-python-in-flask/]
function sendPython(distance, fuelType, co2, tripType, selectedMode) {
  $.ajax({
    url: "/process",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      co2: co2,
      distance: distance,
      fuelType: fuelType,
      tripType: tripType,
      selectedMode: selectedMode,
    }),
    success: function (response) {
      // Handle successful response
      document.getElementById("output").innerHTML = JSON.stringify(response);
    },
    error: function (error) {
      // Error handling
      console.log("AJAX Error:", error);
    },
  });
}
