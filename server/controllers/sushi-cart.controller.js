const router = require('express').Router();
const { addToCart, getUserCart, deleteFromCart } = require("../services/sushi-cart.service");

router.post("/addtocart", (req, res) => {
    addToCart(req.body)
        .then(cart => {
            res.json(cart);
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
});

router.post("/getcart", (req, res) => {
    getUserCart(req.body)
        .then(cart => {
            res.json(cart);
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
});

router.post("/deletefromcart", (req, res) => {
    deleteFromCart(req.body)
        .then(cart => {
            res.status(200)
            .json(cart)
        }).catch(err => {
            return res.status(400).send({
                message: `${err.message}`,
                type: "ERROR"
            });
        })
})

module.exports = router