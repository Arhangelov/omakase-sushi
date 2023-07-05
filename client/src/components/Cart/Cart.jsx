import React from 'react'
import { useCart } from "../../store/CartContext";

import "./Cart.css"
import { incrementCartItem } from '../../actions/cartActions';
import { useCallback } from 'react';

const Cart = () => {
    const [ state, dispatch ] = useCart();

    const handleIncrementProduct = useCallback(() => {
        dispatch(incrementCartItem({ incrementBy: 1 }));
    }, [dispatch]);

    return (
        <>
            <h1>Cart Page</h1>
            <section className='container-cart'>
                <ol>
                <table>
                    {state.map((pr) =>
                        <tr key={pr.id}>
                            <li>
                            <td className='container-img'> <img className='cart-img' src={pr.img} alt="product" /> </td>
                            <td> {pr.title} </td>
                            <td>
                                <button onClick={()=> dispatch({ type: "DECREMENT", payload: { id: pr.id } })}>-</button>
                                {pr.qty}
                                <button onClick={handleIncrementProduct}>+</button>
                            </td>
                            <td> {pr.price * pr.qty} BGN </td>
                            </li>
                        </tr>
                    )}
                </table>
                </ol>
            </section>
        </>
    )
}

export default Cart