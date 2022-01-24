const express = require("express");

const router = express.Router();
const handlers = require("./handlers");

router.get("/", handlers.home);
router.get("/login", handlers.login);
router.post("/info", handlers.info); // html file
router.post("/checkUser", handlers.checkUsers); // json from database
router.get("/logout", handlers.logout);

// router.get("/add-train");
// router.get("/remove-train");
// router.get("/add-station");
// router.get("/remove-station");
// router.get("/add-user");
// router.get("/remove-user");

router.use((req, res) => {
  res.status(404).send(`<h1>Not found</h1>`);
});

module.exports = router;
