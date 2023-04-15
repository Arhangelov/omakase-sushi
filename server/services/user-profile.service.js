const User = require("../models/User");

const getHistoryOfOrders = async (userId) => {
    const user = await User.findById(userId);
    return user.purchaseHistory;
}

const rePurchaseOrder = async ({ userId, cart }) => {
    const user = await User.findById(userId);
    user.cart = [];
    user.cart.push(...cart);

    return user.save();
}

module.exports = {
    getHistoryOfOrders,
    rePurchaseOrder
}