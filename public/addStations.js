const checkbox_div = document.getElementById("checkboxes");
fetch("http://localhost:3000/train_info")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      train_ = data[i].train_number;
      const train_label = document.createElement("label");

      const train_input = document.createElement("input");
      train_input.type = "checkbox";
      train_input.id = String(i + 1);
      train_input.classList.add("station");
      train_input.value = String(i + 1);
      // station_label.appendChild();
      train_label.appendChild(train_input);
      train_label.innerHTML += data[i].train_number;

      checkbox_div.appendChild(train_label);
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
    document.getElementById("1").required;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  var missing = true;
  const inputs = document.querySelectorAll(".station");
  inputs.forEach((input) => {
    if (input.checked) {
      missing = false;
      var checkedValue = document.querySelectorAll(".station:checked");
      trains = [];
      checkedValue.forEach((element) => {
        trains.push(element.value);
      });
    }
  });
  if (missing) {
    alert("please choose a train");
  } else {
    const station_name = document.getElementById("stationName").value;
    const location = document.getElementById("location").value;
    const start_time = document.getElementById("start_at").value;
    const end_time = document.getElementById("end_at").value;
    const trains_converted = trains.map((train) => Number(train));
    console.log(trains_converted);

    myData = {
      station_name: station_name,
      location: location,
      all_trains: trains_converted,
      start_time: start_time,
      end_time: end_time,
    };
    fetch("http://localhost:3000/add-stations", {
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
          alert("station added");
          window.location.href = "http://localhost:3000/";
        } else if ((data.adding = 23505)) {
          alert("station  already exists");
        } else {
          alert("sth wen wron, station not added");
        }
      });
  }
});
