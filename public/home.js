const loginbutton = document.getElementById("login");
const logoutbutton = document.getElementById("logout");
const dropdown = document.getElementById("dropdown");
const dropbtn = document.getElementById("dropbtn");
const dropdown_content = document.getElementById("dropdown-content");
console.log(dropbtn);
console.log(logoutbutton);

if (document.cookie) {
  logoutbutton.classList.add("visible");
  loginbutton.classList.remove("visible");
  // dropdown.classList.add("visible");
  // dropbtn.classList.add("visible");
  // dropdown_content.classList.add("visible");
} else {
  loginbutton.classList.add("visible");
  logoutbutton.classList.remove("visible");
  // dropdown.classList.remove("visible");
  // dropbtn.classList.remove("visible");
  // dropdown_content.classList.remove("visible");
}

const radio1 = document.getElementById("location_input");
const radio2 = document.getElementById("stations_input");

radio1.addEventListener("click", (event) => {
  const stations = document.getElementById("stations");
  const location = document.getElementById("location");

  stations.disabled = true;
  location.disabled = false;
});

radio2.addEventListener("click", (event) => {
  const stations = document.getElementById("stations");
  const location = document.getElementById("location");

  location.disabled = true;
  stations.disabled = false;
});

const submit = document
  .querySelector("form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const sel = document.querySelector('input[name="group1"]:checked').value;
    if (sel == "location") {
      var choice = document.getElementById("location").value;
    } else {
      var choice = document.getElementById("stations").value;
    }
    Mydata = { Myoption: sel, Mychoice: choice };
    fetch("http://localhost:3000/info", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Mydata), // body data type must match "Content-Type" header
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.location) {
          const output = document.querySelector("output");
          output.innerHTML = "";
          const result = document.createElement("p2");
          const result1 = document.createElement("p3");
          const result2 = document.createElement("p4");
          const result3 = document.createElement("p4");

          result.innerHTML = "location: " + data.location;
          result1.innerHTML = "trains: " + data.all_trains;
          result2.innerHTML = "opens at: " + data.start_at;
          result3.innerHTML = "closes at: " + data.end_at;

          document.querySelector("output").appendChild(result);
          document.querySelector("output").appendChild(result1);
          document.querySelector("output").appendChild(result2);
          document.querySelector("output").appendChild(result3);
        } else {
          console.log(data);
          const output = document.querySelector("output");
          output.innerHTML = "";
          const result = document.createElement("p2");
          const result1 = document.createElement("p3");
          const result2 = document.createElement("p4");

          result.innerHTML = "station name: " + data.station_name;
          result1.innerHTML = "opens at: " + data.start_at;
          result2.innerHTML = "closes at: " + data.end_at;
          document.querySelector("output").appendChild(result);
          document.querySelector("output").appendChild(result1);
          document.querySelector("output").appendChild(result2);
        }
      });
  });
