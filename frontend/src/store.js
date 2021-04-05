import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'react-thunk';
import { productsListReducer } from './reducers/productReducers';

const initialState = {};
const reducer = combineReducers({
    productList: productsListReducer,
})

const composeEnhancer = winodw.__REDUX-DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState , composeEnhancer(applyMiddleware(thunk)));

export default store;
