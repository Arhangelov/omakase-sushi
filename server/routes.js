const router = require('express').Router();

const userAuthController = require("./controllers/user-auth.controller");
const createSushiController = require("./controllers/sushi-create.controller");
const sushiMenuController = require("./controllers/sushi-menu.controller");
const cartController = require("./controllers/sushi-cart.controller");

router.use("/auth", userAuthController);
router.use("/createSushi", createSushiController);
router.use("/menu", sushiMenuController);
router.use("/cart", cartController);

module.exports = router;