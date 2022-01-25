var expanded = false;

function showCheckboxes() {
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
    document.getElementById("webahead9").required;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var missing = true;
  const inputs = document.querySelectorAll(".trains");
  inputs.forEach((input) => {
    if (input.checked) {
      missing = false;
      var checkedValue = document.querySelectorAll(".trains:checked");
      stations = [];
      checkedValue.forEach((element) => {
        stations.push(element.value);
      });
    }
  });
  if (missing) {
    alert("please choose a station");
  }
  const train_number = document.getElementById("trainNumber").value;
  const driver = document.getElementById("driver").value;
  const passenger_number = document.getElementById("passenger_number").value;
  const stations_converted = stations.map((station) => {
    parseInt(station);
  });
  console.log(stations_converted);

  myData = {
    train_number: train_number,
    driver: driver,
    all_stations: stations,
    passenger_number: passenger_number,
  };
  fetch("http://localhost:3000/add-trains", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myData), // body data type must match "Content-Type" header
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      alert("train added");
      window.location.href = "http://localhost:3000/";
    });
});
