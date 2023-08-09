import { useCallback, useContext, useEffect, useState } from 'react'
import { getPurchaseHistoryService, rePurchaseOrderService } from '../../services/userProfile.service'
import { Context } from '../../store/UserContext'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user] = useContext(Context);
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const navigate = useNavigate();

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
            <h1>{user.username} Profile Page</h1>
            <h3>Purchase Again</h3>
            <table>
                {purchaseHistory.map(order => 
                <tr key={order.id}>
                    <td>{order.currDate}</td>
                    <td>{order.cart.map(sushi => `${sushi.qty}x ${sushi.title}, `)}</td>
                    <td>{order.totalPrice.toFixed(2)} BGN</td>
                    <button onClick={() => addToCartAgainHandler(order.cart, order.totalPrice)}>Order Again</button>
                </tr>    
                )}
            </table>
        </>
    )
}

export default Profile