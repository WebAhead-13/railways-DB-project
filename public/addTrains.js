const checkbox_div = document.getElementById("checkboxes");
fetch("http://localhost:3000/station_info")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      station_ = data[i].station_name;
      const station_label = document.createElement("label");

      const station_input = document.createElement("input");
      station_input.type = "checkbox";
      station_input.id = data[i].station_name;
      station_input.classList.add("trains");
      station_input.value = String(i + 1);
      // station_label.appendChild();
      station_label.appendChild(station_input);
      station_label.innerHTML += data[i].station_name;

      checkbox_div.appendChild(station_label);
    }
  })
  .catch((error) => {
    alert(error);
    window.location.href = "http://localhost:3000/add-station";
  });

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
  console.log(inputs);
  inputs.forEach((input) => {
    console.log(inputs);
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
  } else {
    const train_number = document.getElementById("trainNumber").value;
    const driver = document.getElementById("driver").value;
    const passenger_number = document.getElementById("passenger_number").value;
    const stations_converted = stations.map((station) => Number(station));
    console.log(stations_converted);

    myData = {
      train_number: train_number,
      driver: driver,
      all_stations: stations_converted,
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
        if (data.adding == true) {
          alert("train added");
          window.location.href = "http://localhost:3000/";
        } else {
          alert("sth wen wron, train not added");
        }
      });
  }
});
