const Sushi = require('../models/Sushi');
const User = require("../models/User");

const getUserCart = async ({ userId }) => {
    const user = await User.findById(userId);
    return user.cart
}

const updateCart = async ({ sushiProduct, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    const currentSushi = user.cart.find((s) => s.id === sushiProduct.id);

    //Check if sushi already exist in the cart and updates the quantity
    if (currentSushi) {
        user.cart.remove(currentSushi);
        user.cart.push(sushiProduct);
    } else {
        user.cart.push(sushiProduct);
    }

    await user.save();
    return user.cart;
}

const deleteFromCart = async ({ sushiId, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    user.cart = user.cart.filter(sushi => sushi.id !== sushiId);

    user.save();
    return user.cart;
}

const finishOrder = async({ userId, finalPrice }) => {
    const showDate = new Date();
    const currDate = showDate.getDate()+"/"+(showDate.getMonth()+1);

    const user = await User.findById(userId);
    const cart = user.cart;

    if(cart.length != 0) {
        user.purchaseHistory.push({ currDate, cart, finalPrice });
        user.cart = [];
    } else {
        throw new Error("The cart is empty.")
    }

    return await user.save();
}
module.exports = {
    updateCart,
    getUserCart,
    deleteFromCart,
    finishOrder
}