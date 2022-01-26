const express = require("express");

const router = express.Router();
const handlers = require("./handlers");

const authnticate = require("./middleware/authnticate");

router.get("/", handlers.home);
router.post("/info", handlers.info);

router.get("/login", handlers.login);
router.post("/checkUser", handlers.checkUsers);
router.get("/logout", handlers.logout);

router.get("/add-station", authnticate, handlers.addStation);
router.post("/add-stations", handlers.addStations);

router.get("/add-train", authnticate, handlers.addTrain);
router.post("/add-trains", handlers.addTrains);

router.get("/add-user", authnticate, handlers.addUser);
router.post("/add-users", handlers.addUsers);

router.get("/station_info", handlers.getStations);
router.get("/train_info", handlers.getTrains);

// router.get("/remove-train");
// router.get("/remove-station");
// router.get("/remove-user");

router.use((req, res) => {
  res.status(404).send(`<h1>Not found</h1>`);
});

module.exports = router;
