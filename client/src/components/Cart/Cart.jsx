import React from 'react'
import { useCart } from "../../store/CartContext";

import "./Cart.css"

const Cart = () => {
    const [ state, dispatch ] = useCart();

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
                                <button onClick={()=> dispatch({ type: "DECREMENT", payload: { id: pr.id, qty: pr.qty } })}>-</button>
                                {pr.qty}
                                <button onClick={()=> dispatch({ type: "INCREMENT", payload: { id: pr.id } })}>+</button>
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