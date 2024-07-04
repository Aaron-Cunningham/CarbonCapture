//Code referenced from https://www.chartjs.org/

/*

Author of this file: Aaron Cunningham

*/

const graphTitle = document.getElementById("title");
const transportChart = document.getElementById("transportChart"); //ID from account HTML for transport chart
const emissionsChart = document.getElementById("emissionsChart"); //ID from account HTML for emissions chart
const emissionsButton = document.getElementById("emissionsButton"); //ID from account HTML for emissions chart button
const transportButton = document.getElementById("transportButton"); //ID from account HTML for transport chart button
const deleteAccountElement = document.getElementById("deleteAccount");
window.onload = () => {
  toggleEmissions(); //Runs the toggleEmissions method straight away to set styles
  fetchTransportData(); // Renders the transport graph
  fetchEmissionsData(); // Renders the emissions graph
};

const fetchTransportData = () => {
  fetch("/user/transport")
    .then((response) => response.json())
    .then((data) => {
      const transportData = {
        labels: ["Car", "Plane", "Train", "Motorbike", "Bus"],
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#00b4c5",
              "#00bf7d",
              "#8babf1",
              "#f57600",
              "#e6308a",
              "#a84432",
            ],
            borderWidth: 1,
          },
        ],
      };
      // Transport chart config
      new Chart(transportChart, {
        type: "bar",
        data: transportData,
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    });
};

const fetchEmissionsData = () => {
  fetch("/user/emissions")
    .then((response) => response.json())
    .then((data) => {
      const emissionsData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            data: data,
            backgroundColor: [
              "#00b4c5",
              "#00bf7d",
              "#8babf1",
              "#f57600",
              "#e6308a",
              "#a84432",
            ],
            borderWidth: 1,
          },
        ],
      };
      // Emissions chart config
      new Chart(emissionsChart, {
        type: "bar",
        data: emissionsData,
        options: {
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "white",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    });
};

const toggleEmissions = () => {
  transportChart.style.display = "none";
  emissionsChart.style.display = "block";
  transportButton.style.color = "black";
  transportButton.style.backgroundColor = "rgb(242, 242, 242)";
  emissionsButton.style.color = "rgb(255, 255, 255)";
  emissionsButton.style.backgroundColor = "rgb(40, 167, 69)";
  graphTitle.textContent = "Emissions graph";
};
const toggleTransport = () => {
  transportChart.style.display = "block";
  emissionsChart.style.display = "none";
  transportButton.style.color = "#FFFFFF";
  transportButton.style.backgroundColor = "#28a745";
  emissionsButton.style.color = "#000000";
  emissionsButton.style.backgroundColor = "#F2F2F2";
  graphTitle.textContent = "Transport graph";
};

const openDeletePrompt = () => {
  deleteAccountElement.style.display = "block";
};

const closeDeletePrompt = () => {
  deleteAccountElement.style.display = "none";
};

module.exports = {
  fetchTransportData,
  fetchEmissionsData,
  toggleEmissions,
  toggleTransport,
  openDeletePrompt,
  closeDeletePrompt,
};
