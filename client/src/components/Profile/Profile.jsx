import { useCallback, useContext, useEffect, useState } from 'react'
import { getPurchaseHistoryService, rePurchaseOrderService } from '../../services/userProfile.service'
import { Context } from '../../store/UserContext'
import { useNavigate } from 'react-router-dom';

import "./Profile.css"

const Profile = () => {
    const [user] = useContext(Context);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.username) navigate("/");
    }, [navigate, user.username])

    useEffect(() => {
        getPurchaseHistoryService(user.email)
            .then(orderHistory => setPurchaseHistory(orderHistory));
    },[user.email]);

    const addToCartAgainHandler = useCallback((cart, totalPrice) => {
        rePurchaseOrderService(cart, totalPrice, user.email);
        navigate("/cart");
    },[user.email, navigate])


    return (
        <>
            <div className="profile-container">
                <h1>{user.username} Profile Page</h1>
                <h3>Purchase Again</h3>
                <div className='order-again-container'>
                    {purchaseHistory.map(order =>
                    <div className='order-card' key={order.id}>
                        <p>Date: {order.currDate}</p>
                        <div className='ordered-products'>
                            {order.cart.map(sushi => 
                            <p>{sushi.qty}x {sushi.title}</p>
                            )}
                        </div>
                        <p>${order.totalPrice.toFixed(2)}</p>
                        <button onClick={() => addToCartAgainHandler(order.cart, order.totalPrice)}>Order Again</button>
                    </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile