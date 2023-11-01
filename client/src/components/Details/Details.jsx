import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductDetails } from '../../services/menuService';

const Details = () => {
    const { productId } = useParams();

    useEffect(() => {
        console.log(productId);
        getProductDetails(productId)
            .then((res) => console.log(res))
            .catch((error) => console.log(error.message));
    }, [productId]);

    return (
        <div className="container-details">
            Details Page
        </div>
    );
}

export default Details