const Sushi = require('../models/Sushi');
const User = require("../models/User");

const addToCart = async ({ sushiProduct, userEmail }) => {
    const user = await User.findOne({ email: userEmail });
    const currentSushi = user.cart.find((s) => s.id === sushiProduct.id);

    //Check if sushi already exist in the cart and updates the quantity
    if (currentSushi) {
        user.cart.remove(currentSushi);
        currentSushi.qty += 1;
        user.cart.push(currentSushi);
    } else {
        user.cart.push(sushiProduct);
    }

    await user.save();
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
    addToCart,
    getUserCart,
    deleteFromCart,
    finishOrder
}