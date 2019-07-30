const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const place = document.querySelector("#location");
const summary = document.querySelector("#summary");
const date = document.querySelector("#date");
const time = document.querySelector("#time");
const temprature = document.querySelector("#temprature");
const precipProbability = document.querySelector("#precipProbability");
const uvIndex = document.querySelector("#uvIndex");
const humidity = document.querySelector("#humidity");
const icon = document.querySelector("#icon");

let today = new Date();
let current_time = today.toLocaleTimeString();
let current_date = today.getDate();
let current_month = today.getMonth();

switch (current_month) {
  case 0:
    current_month = "Jan";
  case 01:
    current_month = "Feb";
  case 02:
    current_month = "Mar";
  case 03:
    current_month = "Apr";
  case 04:
    current_month = "May";
  case 05:
    current_month = "Jun";
  case 06:
    current_month = "Jul";
  case 07:
    current_month = "Aug";
  case 08:
    current_month = "Sep";
  case 9:
    current_month = "Oct";
  case 10:
    current_month = "Nov";
  case 11:
    current_month = "Dec";
}
date.textContent = current_date + " | " + current_month;
time.textContent = current_time;

function refreshPage() {
  window.location.reload();
}

weatherForm.addEventListener("submit", e => {
  e.preventDefault();

  const location = search.value;
  place.textContent = "loading...";
  summary.textContent = "";
  temprature.textContent = "";
  precipProbability.textContent = "";
  uvIndex.textContent = "";
  humidity.textContent = "";

  fetch("/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        location.textContent = data.error;
      } else {
        place.textContent = data.location;
        summary.textContent = data.forecast[0];
        temprature.textContent = Math.round(data.forecast[1]) + "°";
        precipProbability.textContent = data.forecast[2];
        uvIndex.textContent = data.forecast[3];
        humidity.textContent = data.forecast[4];
        // icon.textContent = data.forecast[5];
      }
    });
  });
});
