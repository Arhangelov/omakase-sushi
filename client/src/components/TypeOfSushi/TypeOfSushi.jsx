import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getSushiType } from '../../services/menu.service';

import { useCart } from '../../store/CartContext'

import "./TypeOfSushi.css"
import { ADD_ITEM_TO_CART } from '../../actions/actionTypes';

const TypeOfSushi = () => {
    const { type } = useParams();
    const [sushi, setSushi] = useState([]);
    const [ state, dispatch ] = useCart();

    useEffect(() => {
        getSushiType(type)
            .then(res => setSushi(res))
            .catch((error) => console.log(error.message))
    },[type])

    const addToCartHandler = ( id, title, img, price) => {
        const qty = 1;
        const cuurProduct = {
            id,
            title,
            img,
            price,
            qty
        }
        dispatch({ type: ADD_ITEM_TO_CART, payload: cuurProduct })
    }

    return (
        <div className="container-wraper">
            <div className='container'>
            {sushi.map((each) =>
                <div className='sushi-product-container' key={each._id}>
                    <img className='productImg' src={each.imageUrl} alt="Sushi Product" />
                    <h3>{each.title}</h3>
                    <p>{each.portion}</p>
                    <p>{each.price} BGN</p>
                    <button onClick={() => addToCartHandler(each._id, each.title, each.imageUrl, each.price, )}>Cart</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default TypeOfSushi