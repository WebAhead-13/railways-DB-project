const loginbutton = document.getElementById("login");
const logoutbutton = document.getElementById("logout");
const editbutton = document.getElementById("edit");

if (document.cookie) {
  logoutbutton.classList.add("visible");
  loginbutton.classList.remove("visible");
  editbutton.classList.add("visible");
} else {
  loginbutton.classList.add("visible");
  logoutbutton.classList.remove("visible");
  editbutton.classList.remove("visible");
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
          console.log(data.location);
        } else {
          console.log(data);
          const result = document.createElement("p");
          result.innerHTML = data.station_name;
          document.querySelector("output").appendChild(result);
        }
      });
  });
