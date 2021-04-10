import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import {productDetailsReducer} from './reducers/productReducers';
import { productsListReducer } from './reducers/productReducers';


const initialState = {
    cart: {
      cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    },
  };
const reducer = combineReducers({
    productList: productsListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState , composeEnhancer(applyMiddleware(thunk)));

export default store;
