import React from 'react';
import { useCart } from '../../store/CartContext';

import './Cart.css';
import { useCallback } from 'react';

const Cart = () => {
  const [cart, setCart] = useCart();
  
  const handleDecrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);

      const index = cart.indexOf(currentCartItem);
      cart[index].qty -= 1;

      if (cart[index].qty === 0) {
        const filteredCart = cart.filter((sushi) => sushi.id !== productId);

        return setCart(filteredCart);
      }

      setCart([...cart]);
    },
    [cart, setCart]
  );

  const handleIncrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);
      const index = cart.indexOf(currentCartItem);
      cart[index].qty += 1;

      setCart([...cart]);
    },
    [cart, setCart]
  );

  const productPrice = (sushiPrice, sushiQty) => {
    return Number(sushiPrice) * Number(sushiQty)
  }


  return (
    <>
      <h1>Cart Page</h1>
      <section className="container-cart">
        <ol>
          <table>
            {cart.map((sushi) => (
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
                  <td>
                    <button onClick={() => handleDecrementProduct(sushi.id)}>
                      -
                    </button>
                    {sushi.qty}
                    <button onClick={() => handleIncrementProduct(sushi.id)}>
                      +
                    </button>
                  </td>
                  <td onChange={() => productPrice(sushi.price, sushi.qty)}> {} BGN </td>
                </li>
              </tr>
            ))}
          </table>
        </ol>
      </section>
    </>
  );
};

export default Cart;
