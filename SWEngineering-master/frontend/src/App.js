/* data.js에서 data를 참고해 product의 세부 정보를 표현 */

import React from 'react';
import {useSelector} from 'react-redux'
import {BrowserRouter, Link, Route } from 'react-router-dom';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  const cart = useSelector((state) => state.cart);
   const { cartItems } = cart;
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
             <Link to="/signin">로그인</Link>
        </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">23조 All rights reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;