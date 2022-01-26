document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  // const email = req.body.email;
  // const token = jwt.sign({ email }, SECRET);
  // res.cookie("user", token, { maxAge: 1200000 });
  // res.redirect("/");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  myObj = { username: username, password: password };

  fetch("http://localhost:3000/checkUser", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myObj), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == true) {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const myUrl = urlParams.get("fromUrl");
        if (myUrl == null) {
          window.location.href = "http://localhost:3000/";
        } else {
          window.location.href = `http://localhost:3000${myUrl}`;
        }
      } else {
        const output = document.querySelector("output");
        output.textContent = "";
        const errormessage = document.createElement("p");
        errormessage.textContent = "incorrect username or password";
        output.appendChild(errormessage);
      }
    });
});
