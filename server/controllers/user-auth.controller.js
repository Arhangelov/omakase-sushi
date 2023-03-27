const router = require("express").Router();
const { COOKIE_NAME } = require("../config/main");
const { register } = require("../services/user-auth.service");
const { registerUserReqValidation } = require("../middleware/user-auth.validation");
const { validationResult } = require("express-validator");

router.post("/register", registerUserReqValidation, (req, res) => {
    const errors = validationResult(req) //Saving any occurred errors.
    //If there're errors mark as Bad Request 400 and return error list.
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    else validationResult(req).throw(); //Else clear validation results and continue with the response.

    register(req.body)
    .then(({ newUserDTO, token }) => {
        res.status(201)
        .cookie(COOKIE_NAME, token, { httpOnly: true })
        .json({ newUserDTO, token })
    }).catch((err) => {
        return res.status(400).send({
            message: `${err.message}`,
            type: "ERROR"
        });
    });
});

module.exports = router;