const User = require("../models/User");

const getHistoryOfOrders = async ({ userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    return user.purchaseHistory;
}

const rePurchaseOrder = async ({ cart, totalPrice, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    user.cart.products = [];
    user.cart.products.push(...cart);
    user.cart.totalPrice = totalPrice;

    return user.save();
}

module.exports = {
    getHistoryOfOrders,
    rePurchaseOrder
}