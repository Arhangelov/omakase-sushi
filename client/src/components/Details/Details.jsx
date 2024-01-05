import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/menuService';
import { Context } from '../../store/UserContext';
import './Details.css';

const Details = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [user] = useContext(Context);


    useEffect(() => {
        console.log(productId);
        getProductDetails(productId)
            .then((res) => setProduct(res))
            .catch((error) => console.log(error.message));
    }, [productId, setProduct]);

    console.log(product);

    return (
        <div className='details-page'>
            <div className="container-details">
                <span className='img-container'>
                    <img className='product-img' src={product.imageUrl} alt={product.title} />
                </span>

                <span className='content-container'>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                    <hr />
                    <h3>$ {product.price?.toFixed(2)}</h3>
                    {user.email ? (
                        <button className='btn-details'>add to cart</button>
                    ) : (
                        <Link className='btn-details' to={"/login"}>Login</Link>
                    )}
                </span>
            </div>
        </div>
    );
}

export default Details