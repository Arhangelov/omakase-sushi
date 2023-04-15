const router = require("express").Router();
const { getHistoryOfOrders, rePurchaseOrder } = require("../services/user-profile.service");

router.get("/:userId", (req, res) => {
    getHistoryOfOrders(req.params.userId)
        .then(orders => {
            res.json(orders);
        })
});

router.post("/repurchaseorder", (req, res) => {
    rePurchaseOrder(req.body)
        .then(cart => {
            res.json(cart);
        })
})

module.exports = router;