/* data.js에서 data를 참고해 product의 세부 정보를 표현 */

import React, { useEffect, useState } from 'react';
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
import EventScreen from './screens/EventScreen';
import EventEditScreen from './screens/EventEditScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';


function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler =() => {
    dispatch(signout());
  }

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <BrowserRouter basename="/">
    <div className="grid-container">
      <header >
        <div className="title">
        <Link className="brand" to="/">
        SEOULTECH & LIVING
          </Link>
        </div>
        <div className="search_box">
        <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
            
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
                  <li>
                    <Link to="/event">이벤트 관리</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>카테고리</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen} exact></Route>
        <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
        <Route path="/event/:id/edit" component={EventEditScreen} exact></Route>
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
        <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
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
            exact
        ></AdminRoute>
        <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
        ></AdminRoute>
        <AdminRoute
            path="/event"
            component={EventScreen}
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
      <footer className="row center">주식회사 seoultech living | 서울과학기술대학교 미래관 | 사업자등록번호 : 1234-5678 |
통신판매업 : 2021-서울노원-12345 | 개인정보관리책임자 : 김상현(kshy1019@naver.com) 
<br/>
일부 상품의 경우 주식회사 seoultechliving은 통신판매의 당사자가 아닌 통신판매중개자로서 
상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;