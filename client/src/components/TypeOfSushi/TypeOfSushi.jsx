import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getSushiType } from '../../services/menu.service';

import "./TypeOfSushi.css"

const TypeOfSushi = () => {
    const { type } = useParams();
    const [sushi, setSushi] = useState([]);

    useEffect(() => {
        getSushiType(type)
            .then(res => setSushi(res))
            .catch((error) => console.log(error.message))
    },[type])

    return (
        <div className='container'>
        {sushi.map((each) =>
                <div className='sushi-product-container' key={each._id}>
                    <img className='productImg' src={each.imageUrl} alt="Sushi Picture" />
                    <h3>{each.title}</h3>
                    <p>{each.portion}</p>
                    <p>{each.price} BGN</p>
                    <button>Cart</button>
                </div>
            )}

        </div>
    )
}

export default TypeOfSushi