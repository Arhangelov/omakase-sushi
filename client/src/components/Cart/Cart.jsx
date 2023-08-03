import { useCallback, useContext, useEffect, useState } from 'react';
//Contexts
import { useCart } from '../../store/CartContext';
import { Context } from '../../store/UserContext';
//Services
import { updateCartService, deleteFromCartService, getCartService } from '../../services/cartService';
//Styles
import './Cart.css';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();


useEffect(() => {
  getCartService(user.email)
    .then((cart) => {
      setCart(cart.products);
      setTotalPrice(cart.totalPrice);
    })
}, [user.email, setCart])
  
  const handleDecrementProduct = useCallback(
    (productId) => {
      const currentCartItem = cart.find((item) => item.id === productId);

      const index = cart.indexOf(currentCartItem);
      cart[index].qty -= 1;

      if (cart[index].qty === 0) {
        const filteredCart = cart.filter((sushi) => sushi.id !== productId);

        deleteFromCartService(cart[index].id, user.email)
          .then(cart => {
            setTotalPrice(cart.totalPrice);
          })
        return setCart(filteredCart);
      }

      setCart([...cart]);

      if(cart[index].qty !== 0) {
        updateCartService(cart[index], user.email)
          .then(cart => {
            return setTotalPrice(cart.totalPrice);
          })
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
      updateCartService(cart[index], user.email)
        .then(cart => {
          return setTotalPrice(cart.totalPrice);
        })
    },
    [cart, setCart, user.email]
  );

  const onFinishOrder = useCallback(() => {
    navigate("/finished-order");
  },[navigate]); 

  return (
    <>
      <h1>Cart Page</h1>
      <section className="container-cart">
        <ol>
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
                  <td>
                    <button onClick={() => handleDecrementProduct(sushi.id)}>
                      -
                    </button>
                    {sushi.qty}
                    <button onClick={() => handleIncrementProduct(sushi.id)}>
                      +
                    </button>
                  </td>
                  <td> {(sushi.qty * sushi.price).toFixed(2)} BGN </td>
                </li>
              </tr>
            ))}
          </table>
            <hr />
            {cart === undefined || cart.length !== 0 ? (
              <>
                <h3>Total{" "}{ totalPrice.toFixed(2) } BGN</h3>
                <button onClick={onFinishOrder}>Finish Order</button>
              </>
            ): ""}
        </ol>
      </section>
    </>
  );
};

export default Cart;
