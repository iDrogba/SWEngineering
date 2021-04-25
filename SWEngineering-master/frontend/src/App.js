/* data.js에서 data를 참고해 product의 세부 정보를 표현 */

import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/SigninScreen';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler =() => {
    dispatch(signout());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
        <Link className="brand" to="/">
         🛒23조_Shop
          </Link>
        </div>
        <div>
        <Link to="/cart">
               장바구니
               {cartItems.length > 0 && (
                 <span className="badge">{cartItems.length}</span>
               )}
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                  </Link>
                  <ul className="dropdown-content">
                    <Link to="#signout" onClick={signoutHandler}>
                      로그아웃
                    </Link>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">로그인</Link>
              )}
        </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">23조 All rights reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;