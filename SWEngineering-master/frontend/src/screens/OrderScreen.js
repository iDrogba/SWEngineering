

 // import { KakaoPayButton } from ' ';

 import React, { useEffect } from 'react';
 import { useDispatch, useSelector } from 'react-redux';
 import { Link } from 'react-router-dom';
 import { detailsOrder, payOrder } from '../actions/orderActions';
 import LoadingBox from '../components/LoadingBox';
 import MessageBox from '../components/MessageBox';
 import { ORDER_PAY_RESET } from '../constants/orderConstants';


 export default function OrderScreen(props) {
   const orderId = props.match.params.id;
   const orderDetails = useSelector((state) => state.orderDetails);
   const { order, loading, error } = orderDetails;
   
   const orderPay = useSelector((state) => state.orderPay);
   const {
     loading: loadingPay,
     error: errorPay,
     success: successPay,
   } = orderPay;
   
   const dispatch = useDispatch();
   useEffect(() => {
    dispatch(detailsOrder(orderId));
}, [dispatch, orderId]);
// 이 부분 paypal 사용 조작 코드 일단 건너뜀.(30,31강)

   return loading ? (
     <LoadingBox></LoadingBox>
   ) : error ? (
     <MessageBox variant="danger">{error}</MessageBox>
   ) : (
     <div>
       <h1>주문 {order._id}</h1>
       <div className="row top">
         <div className="col-2">
           <ul>
             <li>
               <div className="card card-body">
                 <h2>배송</h2>
                 <p>
                   <strong>이름:</strong> {order.shippingAddress.fullName} <br />
                   <strong>주소: </strong> {order.shippingAddress.address},
                   {order.shippingAddress.city},{' '}
                   {order.shippingAddress.postalCode},
                   {order.shippingAddress.country}
                 </p>
                 {order.isDelivered ? (
                   <MessageBox variant="success">
                     {order.deliveredAt} 에 배송됨
                   </MessageBox>
                 ) : (
                   <MessageBox variant="danger">배송되지 않음</MessageBox>
                 )}
               </div>
             </li>
             <li>
               <div className="card card-body">
                 <h2>결제</h2>
                 <p>
                   <strong>방법:</strong> {order.paymentMethod}
                 </p>
                 {order.isPaid ? (
                   <MessageBox variant="success">
                     Paid at {order.paidAt}
                   </MessageBox>
                 ) : (
                   <MessageBox variant="danger">미결제</MessageBox>
                 )}
               </div>
             </li>
             <li>
               <div className="card card-body">
                 <h2>주문 상품</h2>
                 <ul>
                   {order.orderItems.map((item) => (
                     <li key={item.product}>
                       <div className="row">
                         <div>
                           <img
                             src={item.image}
                             alt={item.name}
                             className="small"
                           ></img>
                         </div>
                         <div className="min-30">
                           <Link to={`/product/${item.product}`}>
                             {item.name}
                           </Link>
                         </div>

                         <div>
                           {item.qty} x ${item.price} = ${item.qty * item.price}
                         </div>
                       </div>
                     </li>
                   ))}
                 </ul>
               </div>
             </li>
           </ul>
         </div>
         <div className="col-1">
           <div className="card card-body">
             <ul>
               <li>
                 <h2>주문 요약</h2>
               </li>
               <li>
                 <div className="row">
                   <div>상품</div>
                   <div>${order.itemsPrice.toFixed(2)}</div>
                 </div>
               </li>
               <li>
                 <div className="row">
                   <div>배송</div>
                   <div>${order.shippingPrice.toFixed(2)}</div>
                 </div>
               </li>
              
               <li>
                 <div className="row">
                   <div>
                     <strong> 주문 합계</strong>
                   </div>
                   <div>
                     <strong>${order.totalPrice.toFixed(2)}</strong>
                   </div>
                 </div>
               </li>
              
             </ul>
           </div>
         </div>
       </div>
     </div>
   );
 }