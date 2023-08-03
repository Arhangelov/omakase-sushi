const router = require('express').Router();

const userAuthController = require("./controllers/userAuthController");
const createSushiController = require("./controllers/sushiCreateController");
const sushiMenuController = require("./controllers/sushiMenuController");
const cartController = require("./controllers/sushiCartController");
const profileController = require("./controllers/userProfileController");

router.use("/auth", userAuthController);
router.use("/createSushi", createSushiController);
router.use("/menu", sushiMenuController);
router.use("/cart", cartController);
router.use("/profile", profileController);

module.exports = router;