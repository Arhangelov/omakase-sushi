const Sushi = require('../models/Sushi');
const User = require("../models/User");

const addToCart = async ({ sushiData, userId, qty }) => {
    const user = await User.findById(userId).populate("cart.id");

    const currentSushi = user.cart.find((s) => s.id === sushiData.id);

    if (currentSushi != null) {
        const filter = { _id: userId, "cart.id": sushiData.id }; 
        const update = { "cart.$.qty": currentSushi.qty + qty };
        await User.findOneAndUpdate( filter, update );
        currentSushi.qty += qty;
        currentSushi.price = sushiData.price * currentSushi.qty;
        await user.save();

    } else {
        const currentQty = currentSushi != null ? currentSushi.qty : qty;
        sushiData.price *= currentQty;
        user.cart.push({ ...sushiData, qty: currentQty });

        await user.save();
    }

    return user.cart;
}

const getUserCart = async ({ userId }) => {
    const user = await User.findById(userId);
    return user.cart
}

const deleteFromCart = async ({ sushiId, userId }) => {
    const user = await User.findById(userId);
    user.cart = user.cart.filter(s => s.id !== sushiId);

    user.save();
    return user.cart;
}
module.exports = {
    addToCart,
    getUserCart,
    deleteFromCart
}