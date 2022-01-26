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
router.post("/add-stations", authnticate, handlers.addStations);

router.get("/add-train", authnticate, handlers.addTrain);
router.post("/add-trains", authnticate, handlers.addTrains);

<<<<<<< HEAD
router.get("/add-user", authnticate, handlers.addUser);
router.post("/add-users", authnticate, handlers.addUsers);
=======
router.get("/add-train", handlers.addTrain);
router.post("/add-trains", handlers.addTrains);
// router.get("/edit", handlers.edit);
>>>>>>> 26b341327a32a8d39ce2663d8f4928f141a9b7f3

// router.get("/remove-train");
// router.get("/remove-station");
// router.get("/remove-user");

router.use((req, res) => {
  res.status(404).send(`<h1>Not found</h1>`);
});

module.exports = router;
