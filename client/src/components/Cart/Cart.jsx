import { useCallback, useContext } from 'react';
//Contexts
import { useCart } from '../../store/CartContext';
import { Context } from '../../store/UserContext';
//Services
import { updateCartService, deleteFromCartService } from '../../services/cart.service';
//Styles
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useCart();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(Context)
  
  const handleDecrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);

      const index = cart.indexOf(currentCartItem);
      cart[index].qty -= 1;

      if (cart[index].qty === 0) {
        const filteredCart = cart.filter((sushi) => sushi.id !== productId);

        deleteFromCartService(cart[index].id, user.email);
        return setCart(filteredCart);
      }

      setCart([...cart]);

      if(cart[index].qty !== 0) {
        return updateCartService(cart[index], user.email);
      }
    },
    [cart, setCart, user.email]
  );

  const handleIncrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);
      const index = cart.indexOf(currentCartItem);
      cart[index].qty += 1;

      setCart([...cart]);
      return updateCartService(cart[index], user.email)
    },
    [cart, setCart, user.email]
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
