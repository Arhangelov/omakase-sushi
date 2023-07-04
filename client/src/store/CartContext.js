import { useReducer, createContext, useContext } from "react";

export const CartContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter((product) => product.id !== action.payload.id);
    //TODO: Need to handle INCREMENT and DECREMENT logic.
        case "INCREMENT":
            // return state.find(product => product.id === action.payload.id);
            return [ ...state, action.payload.qty + 1 ];

        case "DECREMENT":
            return state
        default: 
            return state
    }
}

export const CartProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer( reducer, [] )

    return (
        <CartContext.Provider value={[state, dispatch]}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext); 