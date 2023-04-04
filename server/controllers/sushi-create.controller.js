const router = require('express').Router();
const { addSushi } = require('../services/sushi-crud.service');


router.post('/', (req, res) => {
    addSushi(req.body)
    .then(() => {
        res.status(201).json({message: "Successfully created."});
    }).catch(err => {
        return res.status(400).send({
            message: `${err.message}`,
            type: "ERROR"
        });
    })
});


module.exports = router;