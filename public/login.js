document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  //   const email = req.body.email;
  //   const token = jwt.sign({ email }, SECRET);
  //   res.cookie("user", token, { maxAge: 1200000 });
  //   res.redirect("/");
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  myObj = { username: username, password: password };

  //   fetch("http://localhost:3000/checkUser", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(), // body data type must match "Content-Type" header
  //   });
});
