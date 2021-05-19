import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { 
  orderCreateReducer, 
  orderDeleteReducer,
  orderDeliverReducer,
  orderDetailsReducer, 
  orderListReducer,
  orderMineListReducer, } from './reducers/orderReducers';
import {
  productCategoryListReducer,
  productCreateReducer, 
  productDeleteReducer,
  productDetailsReducer,
  productReviewCreateReducer,
  productsListReducer, 
  productTopSellerListReducer, 
  productUpdateReducer,
} from './reducers/productReducers';
import {
  eventCategoryListReducer,
  eventCreateReducer, 
  eventDeleteReducer,
  eventDetailsReducer,
  eventReviewCreateReducer,
  eventsListReducer, 
  eventTopSellerListReducer, 
  eventUpdateReducer,
} from './reducers/eventReducers';
import {   userDeleteReducer,
  userDetailsReducer,  userListReducer,
  userRegisterReducer, userSigninReducer, userTopSellerListReducer, userUpdateProfileReducer,  userUpdateReducer,
} from './reducers/userReducers';


const initialState = {
    userSignin: {
      userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    },
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
        // 뒤로가기 해서 배송지 화면으로 갔을 때 버퍼에 저장된 입력값 보여줌.
        shippingAddress: localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')): {},
        paymentMethod: 'KakaoPay',
      },
  };
const reducer = combineReducers({
    productList: productsListReducer,
    productDetails: productDetailsReducer,
    eventList: eventsListReducer,
    eventDetails: eventDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    eventCreate: eventCreateReducer,
    eventUpdate: eventUpdateReducer,
    eventDelete: eventDeleteReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productTopSellersList: productTopSellerListReducer,
    productReviewCreate: productReviewCreateReducer,
    eventCategoryList: eventCategoryListReducer,
    eventTopSellersList: eventTopSellerListReducer,
    eventReviewCreate: eventReviewCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState , composeEnhancer(applyMiddleware(thunk)));

export default store;
