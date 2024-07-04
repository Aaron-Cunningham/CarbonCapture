/*

Author of this file: Aaron Cunningham

*/

const TRAIN_EMISSION_FACTOR_MILES_PPM = 0.0715;
const BUS_EMISSIONS_FACTOR_LOCAL = 0.21; // Source [https://www.creativecarbonscotland.com/carbon-management/guidance-for-reporting-organisations/emission-factors/]
const BUS_EMISSIONS_FACTOR_COACH = 0.05; // Source [https://www.creativecarbonscotland.com/carbon-management/guidance-for-reporting-organisations/emission-factors/]
const CONVERSION_TO_LITRES = 4.54;
const DIESEL_EMISSIONS_FACTOR = 2.51; // Source [https://www.creativecarbonscotland.com/carbon-management/guidance-for-reporting-organisations/emission-factors/]
const PETROL_EMISSIONS_FACTOR = 2.1; // Source [https://www.creativecarbonscotland.com/carbon-management/guidance-for-reporting-organisations/emission-factors/]
const SMALL_BIKE_EMISSIONS_FACTOR = 0.08277; // Source [https://thrustcarbon.com/insights/how-to-calculate-motorbike-co2-emissions]
const MEDIUM_BIKE_EMISSIONS_FACTOR = 0.10086; // Source [https://thrustcarbon.com/insights/how-to-calculate-motorbike-co2-emissions]
const LARGE_BIKE_EMISSIONS_FACTOR = 0.13237; // Source [https://thrustcarbon.com/insights/how-to-calculate-motorbike-co2-emissions]
const EMISSIONS_FACTOR_AVIATION_FUEL = 3.15;
const ADDITIONAL_EMISSIONS_FLIGHT = 2; //This CO2 is generally emitted into the high atmosphere, and this is thought to have a greater greenhouse effect than CO2 released at sea level. The emissions are therefore adjusted by multiplication by a factor of 2.00

//Function below Calculates train emissions per passenger mile co2
const calculateTrainCo2 = (distanceMiles) => {
  distanceError(distanceMiles);
  co2 = TRAIN_EMISSION_FACTOR_MILES_PPM * distanceMiles;
  return Number(co2.toFixed(2));
};

// Function to calculate CO2 emissions for bus
const calculateBusCo2 = (distanceKm, fuelType) => {
  distanceError(distanceKm);
  fuelTypeErrorBus(fuelType);
  let co2;
  if (fuelType == "Local bus") {
    co2 = distanceKm * BUS_EMISSIONS_FACTOR_LOCAL;
  } else if (fuelType == "Coach") {
    co2 = distanceKm * BUS_EMISSIONS_FACTOR_COACH;
  }
  return Number(co2.toFixed(2));
};

let motorbikeEmissions = (fuelType, distanceKm) => {
  distanceError(distanceKm);
  fuelTypeErrorMotorbike(fuelType);
  let co2;
  if (fuelType == "Under 125cc") {
    co2 = distanceKm * SMALL_BIKE_EMISSIONS_FACTOR;
  } else if (fuelType == "125cc to 500cc") {
    co2 = distanceKm * MEDIUM_BIKE_EMISSIONS_FACTOR;
  } else if (fuelType == "Over 500cc") {
    co2 = distanceKm * LARGE_BIKE_EMISSIONS_FACTOR;
  }
  return Number(co2.toFixed(3));
};

let carEmissions = (distanceMiles, mpg, fuelType) => {
  distanceError(distanceMiles);
  mpgError(mpg);
  fuelTypeErrorCar(fuelType);
  if (fuelType == "Petrol") {
    co2 =
      (distanceMiles / mpg) * CONVERSION_TO_LITRES * PETROL_EMISSIONS_FACTOR;
  } else if (fuelType == "Diesel")
    co2 =
      (distanceMiles / mpg) * CONVERSION_TO_LITRES * DIESEL_EMISSIONS_FACTOR;
  return co2;
};

const milesToKm = (miles) => {
  return miles * 1.60934;
};

const fuelTypeErrorBus = (fuelType) => {
  if (fuelType !== "Local bus" && fuelType !== "Coach") {
    throw new Error("Invalid mode of transit.");
  }
};

const fuelTypeErrorMotorbike = (fuelType) => {
  if (
    fuelType !== "Under 125cc" &&
    fuelType !== "125cc to 500cc" &&
    fuelType !== "Over 500cc"
  ) {
    throw new Error(
      "Invalid engine size for motorbike. Should be Under 125cc, 125cc to 500cc, or Over 500cc"
    );
  }
  return;
};

const fuelTypeErrorCar = (fuelType) => {
  if (fuelType !== "Diesel" && fuelType !== "Petrol") {
    throw new Error("Invalid fuel type, should be Petrol or Diesel");
  }
  return;
};

const distanceError = (distance) => {
  if (typeof distance !== "number") {
    throw new Error("Invalid distance, distance should be a number");
  } else if (distance < 0) {
    throw new Error(
      "Invalid distance input, distance should be greater than 0"
    );
  }
  return;
};

const mpgError = (mpg) => {
  if (typeof mpg !== "number") {
    throw new Error("Invalid mpg, mpg should be a number");
  } else if (mpg < 0) {
    throw new Error("Invalid mpg input, mpg should be greater than 0");
  }
};
const boeing787Dreamliner = {
  efficiencyPerKm: 5.63, //How much fuel is burned in KG per km Referenced [https://simpleflying.com/high-density-low-cost-long-haul/#:~:text=Fuel%20burn%20per%20seat&text=Estimating%20a%20distance%20of%20around,km%20(21.4%20lb%2Fmi)]
  seatCapacity: 336,
  loadFactor: 0.65, // Percentage of the aircraft full
  taxiTakeoffLandingFuel: 1400,
};
const airbus320 = {
  efficiencyPerKm: 5.63,
  seatCapacity: 180,
  loadFactor: 0.65, // Percentage of the aircraft full
  taxiTakeoffLandingFuel: 1400,
};

// Referenced [https://www.carbonindependent.org/22.html]
const calculateCo2Flight = (distance, fuelType) => {
  distanceError(distance);
  fuelTypeErrorPlane(fuelType);
  let aircraft;
  if (distance > 2500) {
    aircraft = boeing787Dreamliner;
  } else {
    aircraft = airbus320;
  }
  const cruiseFuelBurKG = distance * aircraft.efficiencyPerKm; //Calculates the amount of fuel burned in kg
  const totalFuelBurned = cruiseFuelBurKG + aircraft.taxiTakeoffLandingFuel;
  const numOfPassengers =
    boeing787Dreamliner.seatCapacity * aircraft.loadFactor; //Converts kg value to tonnes
  const fuelUsedPerPassKm = totalFuelBurned / (distance * numOfPassengers);
  const co2PerPassKm = fuelUsedPerPassKm * EMISSIONS_FACTOR_AVIATION_FUEL;
  co2 = distance * co2PerPassKm * ADDITIONAL_EMISSIONS_FLIGHT; // Additional factors such as emissions having a greater effect at alititude and old refining
  co2 = classCalculation(co2, fuelType);
  return co2;
};

const classCalculation = (co2, fuelType) => {
  if (fuelType === "First Class") {
    co2 = co2 * 4;
  } else if (fuelType === "Premium Class") {
    co2 = co2 * 3;
  }
  return co2;
};

const fuelTypeErrorPlane = (fuelType) => {
  if (
    fuelType !== "First Class" &&
    fuelType !== "Premium Class" &&
    fuelType !== "Economy"
  ) {
    throw new Error("Invalid fuel type, should be first or premium class");
  }
  return;
};
module.exports = {
  calculateTrainCo2,
  calculateBusCo2,
  motorbikeEmissions,
  carEmissions,
  calculateCo2Flight,
  milesToKm,
};
