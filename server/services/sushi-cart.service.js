const Sushi = require('../models/Sushi');
const User = require("../models/User");

const addToCart = async ({ sushiData, userId, qty }) => {
    const user = await User.findById(userId).populate("cart.id");

    const currentSushi = user.cart.find((s) => s.id === sushiData.id);

    if (currentSushi != null) {
        const filter = { _id: userId, "cart.id": sushiData.id };
        const update = { 
            "cart.$.qty": currentSushi.qty += qty, 
            "cart.$.price": sushiData.price *= currentSushi.qty
        };
        await User.findOneAndUpdate( filter, update );
    } else {
        const currentQty = currentSushi != null ? currentSushi.qty : qty;
        sushiData.price *= qty;
        user.cart.push({ ...sushiData, qty: currentQty });

        await user.save();
    }

    return user.cart;
}

module.exports = {
    addToCart
}