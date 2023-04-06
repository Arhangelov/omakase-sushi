const router = require('express').Router();

const userAuthController = require("./controllers/user-auth.controller");
const createSushiController = require("./controllers/sushi-create.controller");
const sushiMenuController = require("./controllers/sushi-menu.controller");

router.use("/auth", userAuthController);
router.use("/createSushi", createSushiController);
router.use("/menu", sushiMenuController);

module.exports = router;