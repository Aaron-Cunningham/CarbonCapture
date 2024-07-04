/*

Author of this file: Aaron Cunningham

*/

let displayBusResults = (
  startDestination,
  endDestination,
  tripType,
  fuelType,
  distanceMiles,
  co2
) => {
  document.getElementById("results").innerHTML = `
    <h2 style="font-size: 24px">Calculations:</h2>
    <p>From: ${
      startDestination.charAt(0).toUpperCase() + startDestination.slice(1)
    }</p>
    <p>To: ${
      endDestination.charAt(0).toUpperCase() + endDestination.slice(1)
    }</p>
    <p>Trip Type: ${tripType}</p>
    <p>Fuel Type: ${fuelType}</p>
    <p>Distance: ${distanceMiles.toFixed(2)} miles</p>
    <div>
      <hr class="border" />
    </div>
    <p>CO2e amount: ${co2.toFixed(2)} KG</p>
  
  `;
};

/*
Function below updates the UI on the Train page with results once called
*/
let displayTrainResults = (
  startDestination,
  endDestination,
  tripType,
  distanceMiles,
  co2
) => {
  document.getElementById("results").innerHTML = `
          <h2 style="font-size: 24px">Calculations:</h2>
          <p>From: ${
            startDestination.charAt(0).toUpperCase() + startDestination.slice(1)
          }</p>
          <p>To: ${
            endDestination.charAt(0).toUpperCase() + endDestination.slice(1)
          }</p>
          <p>Trip Type: ${tripType}</p>
          <p>Fuel Type: National Rail</p>
          <p>Distance: ${distanceMiles.toFixed(2)} miles</p>
          <div>
            <hr class="border" />
          </div>
          <p>CO2e amount: ${co2.toFixed(2)} KG</p>
  
        `;
};

let displayMotorbikeResults = (
  startDestination,
  endDestination,
  tripType,
  fuelType,
  distanceMiles,
  co2
) => {
  document.getElementById("results").innerHTML = `
    <h2 style="font-size: 24px">Calculations:</h2>
    <p>From: ${
      startDestination.charAt(0).toUpperCase() + startDestination.slice(1) // Sets first character to upper case
    }</p>
    <p>To: ${
      endDestination.charAt(0).toUpperCase() + endDestination.slice(1) // Sets first character to upper case
    }</p>
    <p>Trip Type: ${tripType}</p>
    <p>Fuel Type: ${fuelType}</p>
    <p>Distance: ${distanceMiles.toFixed(2)} miles</p>
    <div>
      <hr class="border" />
    </div>
    <p>CO2e amount: ${
      co2.toFixed(2) //Rounds down to 2 decimap places
    } KG</p> 
  `;
};

/*
This function updates the users UI with the inputted values when called
*/
const flightDataResults = (
  startDestination,
  endDestination,
  tripType,
  fuelType,
  distance,
  co2
) => {
  document.getElementById("results").innerHTML = `
      <h2 style="font-size: 24px">Calculations:</h2>
      <p>From: ${startDestination}</p>
      <p>To: ${endDestination}</p>
      <p>Trip Type: ${tripType}</p>
      <p>Class Type: ${fuelType}</p>
      <p>Distance: ${distance.toFixed(2)} miles</p>
      <div>
        <hr class="border" />
      </div>
      <p>CO2e amount: ${co2.toFixed(2)} KG</p>
    `;
};

let displayCarResults = (
  startDestination,
  endDestination,
  tripType,
  fuelType,
  distanceMiles,
  co2
) => {
  document.getElementById("results").innerHTML = `
            <h2 style="font-size: 24px">Calculations:</h2>
            <p>From: ${
              startDestination.charAt(0).toUpperCase() +
              startDestination.slice(1) // Sets first character to upper case
            }</p>
            <p>To: ${
              endDestination.charAt(0).toUpperCase() + endDestination.slice(1) // Sets first character to upper case
            }</p>
            <p>Trip Type: ${tripType}</p>
            <p>Fuel Type: ${fuelType}</p>
            <p>Distance: ${distanceMiles.toFixed(2)} miles</p>
            <div>
              <hr class="border" />
            </div>
            <p>CO2 amount: ${
              co2.toFixed(2) //Rounds down to 2 decimap places
            } KG</p> 
          `;
};
