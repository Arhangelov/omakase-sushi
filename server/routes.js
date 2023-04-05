const router = require('express').Router();

const userAuthController = require("./controllers/user-auth.controller");
const createSushiController = require("./controllers/sushi-create.controller");

router.use("/auth", userAuthController);
router.use("/createSushi", createSushiController);

module.exports = router;