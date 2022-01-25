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
function addStation(req, res) {
  res.sendFile(path.join(__dirname, "./public/addStations.html"));
}
function addStations(req, res) {
  db.query(
    "INSERT INTO stations(station_name, location, all_trains, start_at, end_at) VALUES ($1,$2,$3,$4,$5)",
    [
      req.body.station_name,
      req.body.location,
      req.body.all_trains,
      req.body.start_time,
      req.body.end_time,
    ]
  ).then((result) => {
    if (result.rowCount > 0) {
      res.send({ adding: true });
    } else {
      res.send({ adding: false });
    }
  });
}
// res.send(true);

function addTrain(req, res) {
  res.sendFile(path.join(__dirname, "./public/addTrains.html"));
}
function addTrains(req, res) {
  db.query(
    "INSERT INTO trains(train_number, driver, stations, passenger_number) VALUES ($1,$2,$3,$4)",
    [
      req.body.train_number,
      req.body.driver,
      req.body.stations,
      req.body.passenger_number,
    ]
  );
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
};
