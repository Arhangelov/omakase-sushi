const router = require('express').Router();
const { validationResult } = require('express-validator');
const { getTypeOfSushiReqValidation } = require("../middleware/sushi-menu.validation");
const { getType } = require("../services/sushi-menu.service")

router.get("/:typeOfSushi", getTypeOfSushiReqValidation, (req, res) => {
    const errors = validationResult(req) //Saving any occurred errors.
    //If there're errors mark as Bad Request 400 and return error list.
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    else validationResult(req).throw(); //Else clear validation results and continue with the response.

    getType(req.params.typeOfSushi)
        .then(typeOfSushi => {
            res.json(typeOfSushi);
        })
})

module.exports = router