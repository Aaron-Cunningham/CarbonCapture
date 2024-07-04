//Code referenced from https://www.chartjs.org/

/*

Author of this file: Lauren Harbige

*/
const usersChart = document.getElementById("usersChart");
const newUsers = document.getElementById("newUsers");
const usersPercent = document.getElementById("usersPercent");
const date = new Date();
let month = date.getMonth();
fetch("/admin/user_data")
  .then((response) => response.json())
  .then((data) => {
    const numOfNewUsers = data[month];
    const previousMonthUsers = data[month - 1];
    let symbol;
    if (numOfNewUsers >= data[month - 1]) {
      // If number of users is greater than the previous months will display green with a +
      usersPercent.style.color = "green";
      symbol = "+";
    } else {
      usersPercent.style.color = "red"; // If the number of new users is less than previous months will display red and a negative sign
      symbol = "-";
    }
    const percentageChange =
      ((numOfNewUsers - previousMonthUsers) / previousMonthUsers) * 100; // Works out the rate of change form the previous months sign ups
    newUsers.innerText = numOfNewUsers;
    usersPercent.innerText = percentageChange.toFixed(2) + "% " + symbol;
    const usersData = {
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
          label: "New Users",
          data: data,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    new Chart(usersChart, {
      type: "line",
      data: usersData,
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
