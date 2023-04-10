const router = require('express').Router();
const { addToCart } = require("../services/sushi-cart.service");

router.post("/addtocart", (req, res) => {
    addToCart(req.body)
        .then(cart => {
            console.log(cart);
            res.json(cart);
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
})

module.exports = router