import { DECREMENT_CART_ITEM, INCREMENT_CART_ITEM } from "./actionTypes";


export const incrementCartItem = ({ incrementBy, id }) => ({
    type: INCREMENT_CART_ITEM,
    payload: {
        incrementBy,
        id
    }
});

export const decrementCartItem = ({ decrementBy }) => ({
    type: DECREMENT_CART_ITEM,
    payload: decrementBy
})