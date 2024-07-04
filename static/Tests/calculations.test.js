const {
  calculateTrainCo2,
  calculateBusCo2,
  carEmissions,
  motorbikeEmissions,
  milesToKm,
  calculateCo2Flight,
} = require("../javascript/calculator/calculations");

/* 

Author of this Test: Aaron Cunningham 

*/
// tests if the 'calculateTrainCo2' function returns the correct emissions output given a journey_legnth
describe("tests calculateTrainCo2 return values", () => {
  test("calculates the CO2 emissions for a given distance", () => {
    expect(parseFloat(calculateTrainCo2(100))).toBe(7.15);
    expect(parseFloat(calculateTrainCo2(1))).toBe(0.07);
    expect(parseFloat(calculateTrainCo2(0))).toBe(0);
  });
});

/* 

Author of this Test: Aaron Cunningham 

*/
// tests if the 'calculateBusCo2' function returns the correct emissions output given a journey_legnth and bus_type
describe("tests calculateBusCo2 return values", () => {
  // Tests on local buses
  test("Calculates the CO2 emissions for a given distance with local buses", () => {
    expect(calculateBusCo2(100, "Local bus")).toBe(21);
    expect(calculateBusCo2(0, "Local bus")).toBe(0);
    expect(calculateBusCo2(1, "Local bus")).toBe(0.21);
  });
  // Tests on coaches
  test("Calculates the CO2 emissions for a given distance with Coaches", () => {
    expect(calculateBusCo2(100, "Coach")).toBe(5);
    expect(calculateBusCo2(0, "Coach")).toBe(0);
    expect(calculateBusCo2(1, "Coach")).toBe(0.05);
  });
});

// tests if the 'carEmissions' function returns the correct emissions output for petrol cars given a journey_legnth and average miles per gallon
describe("tests 'carEmissions' return values for Petrol Cars", () => {
  test("calculates the CO2 emissions for a given distance with petrol cars", () => {
    expect(carEmissions(100, 5, "Petrol")).toBe(190.68);
    expect(carEmissions(0, 5, "Petrol")).toBe(0);
    expect(carEmissions(1, 5, "Petrol")).toBe(1.9068);
  });
});

// tests if the 'carEmissions' function returns the correct emissions output for diesel cars given a journey_legnth and average miles per gallon
describe("tests 'carEmissions' return values for Diesel Cars", () => {
  test("calculates the CO2 emissions for a given distance with diesel cars", () => {
    expect(carEmissions(100, 5, "Diesel")).toBe(227.908);
    expect(carEmissions(0, 5, "Diesel")).toBe(0);
    expect(carEmissions(1, 5, "Diesel")).toBe(2.27908);
  });
});

// tests if the 'motorbikeEmissions' function returns the correct emissions output for motorbikes under 125cc given a journey_legnth
describe("calculate Under 125cc Bike Co2", () => {
  test("calculates the CO2 emissions for a given distance with low performance bikes", () => {
    expect(motorbikeEmissions("Under 125cc", 100)).toBe(8.277);
    expect(motorbikeEmissions("Under 125cc", 0)).toBe(0);
    expect(motorbikeEmissions("Under 125cc", 1)).toBe(0.083);
  });
});

// tests if the 'motorbikeEmissions' function returns the correct emissions output for motorbikes from 125cc-500cc given a journey_legnth
describe("calculate 125 to 500cc Bike Co2", () => {
  test("calculates the CO2 emissions for a given distance with middle performance bikes", () => {
    expect(motorbikeEmissions("125cc to 500cc", 100)).toBe(10.086);
    expect(motorbikeEmissions("125cc to 500cc", 0)).toBe(0);
    expect(motorbikeEmissions("125cc to 500cc", 1)).toBe(0.101);
  });
});

// tests if the 'motorbikeEmissions' function returns the correct emissions output for motorbikes over 500cc given a journey_legnth
describe("calculate Over 500cc Bike Co2", () => {
  test("calculates the CO2 emissions for a given distance with high performance bikes", () => {
    expect(motorbikeEmissions("Over 500cc", 100)).toBe(13.237);
    expect(motorbikeEmissions("Over 500cc", 0)).toBe(0);
    expect(motorbikeEmissions("Over 500cc", 1)).toBe(0.132);
  });
});

// tests if the 'milesToKm' function returns the correct number of miles given an input number of kilometers
describe("calculate miles to km conversion", () => {
  test("converts miles to km", () => {
    expect(milesToKm(100)).toBe(160.934);
    expect(milesToKm(0)).toBe(0);
    expect(milesToKm(1)).toBe(1.60934);
  });
});

// tests if the 'calculateCo2Flight' function returns the correct amount of emmissions for a first class journey given an an input legnth
describe("calculate first class Flights Co2", () => {
  test("calculates the CO2 emissions for a given distance with flights for first class", () => {
    expect(calculateCo2Flight(10000, "First Class")).toBe(6657.692307692308);
    expect(calculateCo2Flight(0, "First Class")).toBe(NaN);
    expect(calculateCo2Flight(1000, "First Class")).toBe(811.153846153846);
  });
});

// tests if the 'calculateCo2Flight' function returns the correct amount of emmissions for a premium class journey given an an input legnth
describe("calculate premium class Flights Co2", () => {
  test("calculates the CO2 emissions for a given distance with flights for premium class", () => {
    expect(calculateCo2Flight(10000, "Premium Class")).toBe(4993.2692307692305);
    expect(calculateCo2Flight(0, "Premium Class")).toBe(NaN);
    expect(calculateCo2Flight(1000, "Premium Class")).toBe(608.3653846153845);
  });
});

/* 

Author of this Test: Aaron Cunningham 

*/
// tests if the 'carEmissions' function handles errors correctly
describe("Tests the car emissions calculator error handing", () => {
  test("Will throw an error for a negative number as distance", () => {
    expect(() => carEmissions(-1, 20, "Diesel")).toThrow(
      "Invalid distance input, distance should be greater than 0"
    );
  });
  test("Will throw an error for a non-number value", () => {
    expect(() => carEmissions("non-number", 24, "Diesel")).toThrow(
      "Invalid distance, distance should be a number"
    );
  });
  test("Will throw an error for a negative value for mpg", () => {
    expect(() => carEmissions(2, -1, "Diesel")).toThrow(
      "Invalid mpg input, mpg should be greater than 0"
    );
  });
  test("Will throw an error for a non-number value for mpg", () => {
    expect(() => carEmissions(2, "non-number", "Diesel")).toThrow(
      "Invalid mpg, mpg should be a number"
    );
  });
  test("Will throw an error for a non existant value for fuelType", () => {
    expect(() => carEmissions(20, 24, "Diese")).toThrow(
      "Invalid fuel type, should be Petrol or Diesel"
    );
  });
  test("Will throw an error for a non String value fuelType", () => {
    expect(() => carEmissions(20, 24, 2)).toThrow(
      "Invalid fuel type, should be Petrol or Diesel"
    );
  });
});
/* 

Author of this Test: Aaron Cunningham 

*/
// tests if the 'calculateBusCo2' function handles errors correctly
describe("Tests the bus emissions calculator error handing", () => {
  test("Will throw an error for a negative number as distance", () => {
    expect(() => calculateBusCo2(-1, 20, "Coach")).toThrow(
      "Invalid distance input, distance should be greater than 0"
    );
  });
  test("Will throw an error for a non-number as distance", () => {
    expect(() => calculateBusCo2("non-number", 20, "Coach")).toThrow(
      "Invalid distance, distance should be a number"
    );
  });
  test("Will throw an error for a unknown bus type", () => {
    expect(() => calculateBusCo2(1, 20, "some Coach")).toThrow(
      "Invalid mode of transit."
    );
  });
  test("Will throw an error for incorrect data type afors fuel type", () => {
    expect(() => calculateBusCo2(1, 20, 1)).toThrow("Invalid mode of transit.");
  });
});

/* 

Author of this Test: Aaron Cunningham 

*/
// tests if the 'calculateTrainCo2' function handles errors correctly
describe("Tests the train emissions calculator error handing", () => {
  test("Will throw an error for a negative number as distance", () => {
    expect(() => calculateTrainCo2(-1)).toThrow(
      "Invalid distance input, distance should be greater than 0"
    );
  });
  test("Will throw an error for a non-number number as distance", () => {
    expect(() => calculateTrainCo2("non-number")).toThrow(
      "Invalid distance, distance should be a number"
    );
  });
});

/* 

Author of this Test: Aaron Cunningham 

*/
// tests if the 'motorbikeEmissions' function handles errors correctly
describe("Tests the motorbike emissions calculator error handing", () => {
  test("Will throw an error for a negative number as distance", () => {
    expect(() => motorbikeEmissions("Under 125cc", -1)).toThrow(
      "Invalid distance input, distance should be greater than 0"
    );
  });
  test("Will throw an error for a non-number number as distance", () => {
    expect(() => motorbikeEmissions("Under 125cc", "non-number")).toThrow(
      "Invalid distance, distance should be a number"
    );
  });
  test("Will throw an error for incorrect fuel type", () => {
    expect(() => motorbikeEmissions("random fuel type", 1)).toThrow(
      "Invalid engine size for motorbike. Should be Under 125cc, 125cc to 500cc, or Over 500cc"
    );
  });
  test("Will throw an error for incorrect typeof fuel type", () => {
    expect(() => motorbikeEmissions(1, 1)).toThrow(
      "Invalid engine size for motorbike. Should be Under 125cc, 125cc to 500cc, or Over 500cc"
    );
  });
});

// tests if the 'calculateCo2Flight' function handles errors correctly
describe("Tests the plane emissions calculator error handing", () => {
  test("Will throw an error for a non existant value for fuelType", () => {
    expect(() => calculateCo2Flight(100, "Gasoline")).toThrow(
      "Invalid fuel type, should be first or premium class"
    );
  });
  test("Will throw an error for a non String value fuelType", () => {
    expect(() => calculateCo2Flight(100, 2)).toThrow(
      "Invalid fuel type, should be first or premium class"
    );
  });
});
