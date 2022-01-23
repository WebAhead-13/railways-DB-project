const path = require("path");
const db = require("./database/cennections");

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

module.exports = {
  home,
  login,
  info,
};
