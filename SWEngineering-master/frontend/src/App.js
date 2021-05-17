/* data.js에서 data를 참고해 product의 세부 정보를 표현 */

import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';


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
      <header >
        <div className="title">
        <Link className="brand" to="/">
         🛒23조_Shop
          </Link>
        </div>
        <div>
          <Route 
            render={({ history }) => (
            <SearchBox history={history}></SearchBox>
            )}
          ></Route>
        </div>
        <div className="topmenu">
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
                    <li>
                      <Link to="/profile">사용자 프로필</Link>
                    </li>
                    <li>
                      <Link to="/orderhistory">구매 내역</Link>
                    </li>
                    <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      로그아웃
                    </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/signin">로그인</Link>
              )}
              {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  관리자 <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">대시보드</Link>
                  </li>
                  <li>
                    <Link to="/productlist">상품 리스트</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">주문 현황</Link>
                  </li>
                  <li>
                    <Link to="/userlist">사용자</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route 
          path="/search/name/:name?" 
          component={SearchScreen} 
          exact
        ></Route>
        <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
        <AdminRoute
            path="/productlist"
            component={ProductListScreen}
        ></AdminRoute>
         <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
           <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
           <AdminRoute
             path="/user/:id/edit"
             component={UserEditScreen}
           ></AdminRoute>
        <Route path="/" component={HomeScreen} exact></Route>

      </main>
      <footer className="row center">23조 All rights reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;