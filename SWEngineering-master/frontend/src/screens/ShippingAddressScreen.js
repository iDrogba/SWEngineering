import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if(!userInfo) {
        props.history.push('/signin');
    }
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment')
        //dispatch save shipping address action
    };
    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>배송지 입력</h1>
                </div>
                <div>
                    <label htmlFor="fullName">이름</label>
                    <input type="text" id="fullName" placeholder="이름을 입력해주세요" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">주소</label>
                    <input type="text" id="address" placeholder="주소를 입력해주세요" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">시/도</label>
                    <input type="text" id="city" placeholder="도시를 입력해주세요" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">우편번호</label>
                    <input type="text" id="postalCode" placeholder="우편번호를 입력해주세요" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">국가</label>
                    <input type="text" id="country" placeholder="국가를 입력해주세요" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">
                        다음단계
                    </button>
                </div>
            </form>
        </div>
    );
}