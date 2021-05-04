import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer} from './reducers/orderReducers';
import {productDetailsReducer} from './reducers/productReducers';
import { productsListReducer } from './reducers/productReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';


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
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState , composeEnhancer(applyMiddleware(thunk)));

export default store;
