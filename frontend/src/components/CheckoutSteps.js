import React from 'react'

export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active': ''}>로그인</div>
            <div className={props.step2 ? 'active': ''}>배송지 입력</div>
            <div className={props.step3 ? 'active': ''}>결제</div>
            <div className={props.step4 ? 'active': ''}>주문확인</div>

        </div>
    )
}
