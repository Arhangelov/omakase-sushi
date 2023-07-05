import { DECREMENT_CART_ITEM, INCREMENT_CART_ITEM } from "./actionTypes";


export const incrementCartItem = ({ incrementBy }) => ({
    type: INCREMENT_CART_ITEM,
    payload: incrementBy
});

export const decrementCartItem = ({ decrementBy }) => ({
    type: DECREMENT_CART_ITEM,
    payload: decrementBy
})