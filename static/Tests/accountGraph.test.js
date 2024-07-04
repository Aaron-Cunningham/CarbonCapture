/*

Author of this file: Aaron Cunningham

*/

document.body.innerHTML = `
  <div id="title">Test</div>
  <canvas id="transportChart"></canvas>
  <canvas id="emissionsChart"></canvas>
  <button id="emissionsButton"></button>
  <button id="transportButton"></button>
  <div id="deleteAccount"></div>
`;

const {
  toggleEmissions,
  toggleTransport,
  openDeletePrompt,
  closeDeletePrompt,
} = require("../javascript/accountPage/accountGraph");

describe("This tests the toggleEmissions function", () => {
  test("toggleEmissions shows emissions chart but hides transport chart", () => {
    toggleEmissions();
    expect(document.getElementById("transportChart").style.display).toBe(
      "none"
    );

    expect(document.getElementById("emissionsChart").style.display).toBe(
      "block"
    );

    expect(document.getElementById("transportButton").style.color).toBe(
      "black"
    );

    expect(
      document.getElementById("transportButton").style.backgroundColor
    ).toBe("rgb(242, 242, 242)");

    expect(document.getElementById("emissionsButton").style.color).toBe(
      "rgb(255, 255, 255)"
    );

    expect(
      document.getElementById("emissionsButton").style.backgroundColor
    ).toBe("rgb(40, 167, 69)");

    expect(document.getElementById("title").textContent).toBe(
      "Emissions graph"
    );
  });
});

describe("This tests the toggleTransport function", () => {
  test("toggleTransport will show the transportGraph but hide the emissionsGraph", () => {
    toggleTransport();
    expect(document.getElementById("transportChart").style.display).toBe(
      "block"
    );

    expect(document.getElementById("emissionsChart").style.display).toBe(
      "none"
    );

    expect(document.getElementById("transportButton").style.color).toBe(
      "rgb(255, 255, 255)"
    );

    expect(
      document.getElementById("transportButton").style.backgroundColor
    ).toBe("rgb(40, 167, 69)");

    expect(document.getElementById("emissionsButton").style.color).toBe(
      "rgb(0, 0, 0)"
    );

    expect(
      document.getElementById("emissionsButton").style.backgroundColor
    ).toBe("rgb(242, 242, 242)");

    expect(document.getElementById("title").textContent).toBe(
      "Transport graph"
    );
  });
});

describe("This tests the openDeletePrompt and closeDeletePrompt functions", () => {
  test("This will display the delete account block element", () => {
    openDeletePrompt();
    expect(document.getElementById("deleteAccount").style.display).toBe(
      "block"
    );
  });

  test("This will hide the delete account block element", () => {
    closeDeletePrompt();
    expect(document.getElementById("deleteAccount").style.display).toBe("none");
  });
});
