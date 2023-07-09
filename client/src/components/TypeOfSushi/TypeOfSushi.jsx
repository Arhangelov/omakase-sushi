import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSushiType } from '../../services/menu.service';

import { useCart } from '../../store/CartContext';

import './TypeOfSushi.css';
import { addToCartService } from '../../services/cart.service';
import { Context } from '../../store/UserContext';

const TypeOfSushi = () => {
  const { type } = useParams();
  const [sushi, setSushi] = useState([]);
  const [cart, setCart] = useCart();
  const [user, setUser] = useContext(Context);

  useEffect(() => {
    getSushiType(type)
      .then((res) => setSushi(res))
      .catch((error) => console.log(error.message));
  }, [type]);

  const addToCartHandler = useCallback(
    (id, title, img, price) => {
      const sushiProduct = { id, title, img, price };
      addToCartService(sushiProduct, user.email);
      const currentCartItem = cart.find((item) => item.id === id);

      if (currentCartItem) {
        const index = cart.indexOf(currentCartItem);
        cart[index].qty += 1;

        return setCart(cart);
      }

      return setCart([
        ...cart,
        {
          id,
          title,
          img,
          price,
          qty: 1,
        },
      ]);
    },
    [cart, setCart]
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
