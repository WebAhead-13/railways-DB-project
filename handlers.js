const path = require("path");
const db = require("./database/cennections");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
require("dotenv").config();

function home(req, res) {
  res.sendFile(path.join(__dirname, "./public/home.html"));
}

function login(req, res) {
  res.sendFile(path.join(__dirname, "./public/login.html"));
}

// function edit(req, res) {
//   res.sendFile(path.join(__dirname, "./public/edit.html"));
// }
function info(req, res) {
  if (req.body.Myoption == "location") {
    db.query(
      "SELECT station_name, start_at, end_at FROM stations WHERE location = $1",
      [req.body.Mychoice]
    ).then((result) => {
      const info = result.rows[0];
      console.log(info);
      res.send(info);
    });
  } else if (req.body.Myoption == "stations") {
    db.query(
      "SELECT location, all_trains, start_at, end_at FROM stations WHERE station_name = $1",
      [req.body.Mychoice]
    ).then((result) => {
      const info = result.rows[0];
      // console.log(info);
      res.send(info);
    });
  }
}
function checkUsers(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.param("fromUrl"), "postLogin");

  db.query("SELECT username, password FROM admins WHERE username = $1", [
    req.body.username,
  ]).then((result) => {
    const user = result.rows;

    if (user[0] && user[0].password == password) {
      const username = req.body.username;

      const token = jwt.sign({ username }, SECRET);
      res.cookie("user", token, { maxAge: 1200000 });

      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  });
}

function logout(req, res) {
  res.clearCookie("user");
  res.redirect("/");
}

function getStations(req, res) {
  db.query("SELECT station_name FROM stations").then((result) => {
    res.send(result.rows);
  });
}

function getTrains(req, res) {
  db.query("SELECT train_number FROM trains").then((result) => {
    res.send(result.rows);
  });
}

function addStation(req, res) {
  res.sendFile(path.join(__dirname, "./public/addStations.html"));
}
function addStations(req, res) {
  db.query(
    "INSERT INTO stations(station_name, location, all_trains, start_at, end_at) VALUES ($1,$2,$3,$4,$5) RETURNING id",
    [
      req.body.station_name,
      req.body.location,
      req.body.all_trains,
      req.body.start_time,
      req.body.end_time,
    ]
  )
    .then((result) => {
      // console.log(result.rows[0].id);
      if (result.rowCount > 0) {
        updateTrains(req.body.all_trains, result.rows[0].id);
        res.send({ adding: true });
      } else {
        res.send({ adding: false });
      }
    })
    .catch((error) => {
      if ((error.code = 23505)) {
        res.send({ adding: 23505 });
      } else {
        res.send({ adding: false });
      }
    });
}

function updateTrains(trains, new_id) {
  trains.forEach((train) => {
    db.query(`SELECT stations FROM trains WHERE id = $1`, [train]).then(
      (result) => {
        const ar = result.rows[0].stations.concat(new_id);
        db.query(`UPDATE trains SET stations = $1 WHERE id = $2`, [ar, train]);
      }
    );
  });
}

function addTrain(req, res) {
  res.sendFile(path.join(__dirname, "./public/addTrains.html"));
}
function addTrains(req, res) {
  db.query(
    "INSERT INTO trains(train_number, driver, stations, passenger_number) VALUES ($1,$2,$3,$4) RETURNING id",
    [
      req.body.train_number,
      req.body.driver,
      req.body.all_stations,
      req.body.passenger_number,
    ]
  ).then((result) => {
    if (result.rowCount > 0) {
      updateStations(req.body.all_stations, result.rows[0].id);
      res.send({ adding: true });
    } else {
      res.send({ adding: false });
    }
  });
}
function updateStations(stations, new_ids) {
  stations.forEach((station) => {
    db.query(`SELECT all_trains FROM stations WHERE id = $1`, [station]).then(
      (result) => {
        const ar = result.rows[0].all_trains.concat(new_ids);
        db.query(`UPDATE stations SET all_trains = $1 WHERE id = $2`, [
          ar,
          station,
        ]);
      }
    );
  });
}

function addUser(req, res) {
  res.sendFile(path.join(__dirname, "./public/addUsers.html"));
}

function addUsers(req, res) {
  db.query(
    "INSERT INTO admins(username, password, title) VALUES ($1,$2,$3) RETURNING id",
    [req.body.username, req.body.password, req.body.title]
  )
    .then((result) => {
      if (result.rowCount > 0) {
        res.send({ adding: true });
      } else {
        res.send({ adding: false });
      }
    })
    .catch((error) => {
      if ((error.code = 23505)) {
        res.send({ adding: 23505 });
      } else {
        res.send({ adding: false });
      }
    });
}

module.exports = {
  home,
  login,
  info,
  checkUsers,
  logout,
  addStations,
  addStation,
  addTrain,
  addTrains,
  addUser,
  addUsers,
  getStations,
  getTrains,
};
