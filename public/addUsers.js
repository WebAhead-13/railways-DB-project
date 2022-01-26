document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const title = document.getElementById("title").value;

  myUser = {
    username: username,
    password: password,
    title: title,
  };
  fetch("http://localhost:3000/add-users", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(myUser), // body data type must match "Content-Type" header
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.adding == true) {
        alert("user added");
        window.location.href = "http://localhost:3000/";
      } else if ((data.adding = 23505)) {
        alert("username already exists");
      } else {
        alert("sth wen wrong, user not added");
      }
    });
});
