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
        
        var citypattern = city.search(/[a-z]|[ \[\]{}()<>?|`~!@#$%^&*_+=,.;:\"'\\]/g);
        var countrypattern = 0;

       for(var i=0;i<country.length;i++){
           if(47<country.charAt(i)||country.charAt(i)<58){
             countrypattern++;
           }
       }

        if(citypattern>=0){
            alert("상세주소 형식이 옳지 않습니다.")
        }else if(country.length !== countrypattern){
            alert("연락처 형식이 옳지 않습니다.")
        }
        else {
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment')
        //dispatch save shipping address action
        }
    
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
                    <label htmlFor="address">기본주소</label>
                    <input type="text" id="address" placeholder="기본주소를 입력해주세요(검색)" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">상세주소</label>
                    <input type="text" id="city" placeholder="상세주소를 입력해주세요" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">우편번호</label>
                    <input type="text" id="postalCode" placeholder="우편번호를 입력해주세요(검색)" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">배송시 연락처</label>
                    <input type="text" id="country" placeholder="배송시 연락처를 입력해주세요" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
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