const { body } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUserReqValidation = [
    body('email')
    .exists({ checkFalsy: true })
    .withMessage("Email is required.")
    .isEmail()
    .trim()
    .normalizeEmail({ gmail_remove_dots: false })
    .withMessage("Email address is invalid.")
    .custom(async email => {
        // Checking if the input email already exists.
        const existingEmail = await User.findOne({ email: email });
        // Rejecting the request if there is a duplicate.
        if (existingEmail) return Promise.reject(`Email ${email} already exists.`);
    }),
]

module.exports = {
    registerUserReqValidation
}