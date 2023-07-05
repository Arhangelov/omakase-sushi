import { useReducer, createContext, useContext } from "react";
import { DECREMENT_CART_ITEM, INCREMENT_CART_ITEM } from "../actions/actionTypes";

export const CartContext = createContext();

const initialState = [
    {
        id:"",
        title:"",
        img:"",
        price:"",
        qty: 0
    }
]

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    img: action.payload.img,
                    price: action.payload.price,
                    qty: action.payload.qty
                }
            ];
        case "REMOVE":
            return state.filter((product) => product.id !== action.payload.id);
    //TODO: Need to handle INCREMENT and DECREMENT logic.
        case INCREMENT_CART_ITEM:
            const index = state.findIndex(
                (p) => p.id === action.payload.id
            );
            if(index >= 0) state[index].qty += 1
            return [...state]
        case DECREMENT_CART_ITEM:
            return state
        default: 
            return state
    }
}

export const CartProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer( reducer, initialState )

    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext); 