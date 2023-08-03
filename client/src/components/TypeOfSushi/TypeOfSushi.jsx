import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useCart } from '../../store/CartContext';
import { Context } from '../../store/UserContext';

import { getSushiType } from '../../services/menuService';
import { updateCartService } from '../../services/cartService';

import './TypeOfSushi.css';

const TypeOfSushi = () => {
  const { type } = useParams();
  const [sushi, setSushi] = useState([]);
  const [cart, setCart] = useCart();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    getSushiType(type)
      .then((res) => setSushi(res))
      .catch((error) => console.log(error.message));
  }, [type]);

  const addToCartHandler = useCallback(
    (id, title, img, price) => {
      const sushiProduct = { id, title, img, price, qty: 1 };
      const currentCartItem = cart.find((item) => item.id === id);

      if (currentCartItem) {
        const index = cart.indexOf(currentCartItem);
        cart[index].qty += 1;

        setCart(cart);
        return updateCartService(cart[index], user.email);
      }

      setCart([ ...cart, sushiProduct ]);
      return updateCartService(sushiProduct, user.email);
    },
    [cart, setCart, user.email]
  );

  return (
    <div className="container-wrapper">
      <div className="container">
        {sushi.map((singleSushi) => (
          <div className="sushi-product-container" key={singleSushi._id}>
            <img
              className="productImg"
              src={singleSushi.imageUrl}
              alt="Sushi Product"
            />
            <h3>{singleSushi.title}</h3>
            <p>{singleSushi.portion}</p>
            <p>{singleSushi.price} BGN</p>
            <button
              onClick={() =>
                addToCartHandler(
                  singleSushi._id,
                  singleSushi.title,
                  singleSushi.imageUrl,
                  singleSushi.price
                )
              }
            >
              Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeOfSushi;
