const Sushi = require('../models/Sushi');
const User = require("../models/User");

const addToCart = async ({ sushiProduct, userEmail }) => {
    console.log(sushiProduct, userEmail);
    const user = await User.findOne({ userEmail });
    const currentSushi = user.cart.find((s) => s.id === sushiProduct.id);

    //Check if sushi already exist in the cart and updates the quantity
    if (currentSushi) {
        console.log("Inside the check");
        const indexOfSushi = user.cart.indexOf(currentSushi);

        user.cart[indexOfSushi].qty += 1;

        await User.findOneAndUpdate( {email: userEmail}, {cart: user.cart}, { returnDocument: 'after' });
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