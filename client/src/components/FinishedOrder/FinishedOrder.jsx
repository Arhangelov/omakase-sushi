import { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Context } from '../../store/UserContext'
import { useCart } from '../../store/CartContext';

import { finishOrderService, getCartService } from '../../services/cartService';

const FinishedOrder = () => {
    const [user, setUser] = useContext(Context);
    const [cart, setCart] = useCart();
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        getCartService(user.email)
            .then((cart) => {
                setCart(cart.products);
                setTotalPrice(cart.totalPrice);
            })
        }, [user.email, setCart, setTotalPrice]);

    useEffect(() => {
        finishOrderService(user.email)
    }, [user.email])

    const onReturnHandler = useCallback(() => {
        navigate("/")
    },[navigate])

    return (
        <section className='finish-order-container'>
            <h1> Thank You for Your Delicious Order, Mr. {user.username}! 🍣🍱🍙</h1>
            <h2>Time Delivery: {Math.floor(Math.random() * (60 - 40) + 40 )} mins</h2>
            <ul>
                Order Details:
                <li>Order Number: {Math.floor(Math.random() * 10000)}</li>
                <li>Delivery Address: {user.address}</li>
            </ul>
            <p>Here's delightful summary of your order:</p>
            <table>
                {cart?.map((sushi) => (
                    <tr key={sushi.id}>
                    <li>
                        <td className="container-img">
                            {' '}
                            <img
                                className="cart-img"
                                src={sushi.img}
                                alt="product"
                            />{' '}
                        </td>
                        <td> {sushi.title} </td>
                        <td> {sushi.qty}x </td>
                        <td> {sushi.price.toFixed(2)} BGN </td>
                    </li>
                    </tr>
                ))}
            </table>
            <ul>
                <li>Delivery Fee: {Number(0).toFixed(2)} BGN</li>
                <li>Total Amount: {totalPrice.toFixed(2)} BGN</li>
            </ul>
            <button onClick={onReturnHandler}>Return</button>
        </section>
    )
}

export default FinishedOrder