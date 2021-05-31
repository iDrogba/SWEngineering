import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const userSignin = useSelector(state => state.userSignin);
    const { shippingAddress } = cart;
    const { userInfo } = userSignin;
    if(!userInfo) {
        props.history.push('/signin');
    }
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const[paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>결제정보</h1>
                </div>
                <div>
                    <div>
                        <input 
                        type="radio" 
                        id="paypal" 
                        value="PayPal"
                        name="paymentMethod" 
                        required 
                        checked 
                        onChange={(e) => setPaymentMethod(e.target.value)} ></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <button className="primary" type="submit">
                        다음단계
                    </button>
                </div>
            </form>
        </div>
    )
}