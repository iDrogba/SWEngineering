/* 제품 클릭 시 화면 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
  
    useEffect(() => {
      dispatch(detailsProduct(productId));
    }, [dispatch, productId]);

    const addToCartHandler = () => {
      props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    return(
        <div>
            {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">이전으로 돌아가기</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>가격 : ${product.price}</li>
                <li>
                  상품설명:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>가격</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>재고</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">구매가능</span>
                        ) : (
                          <span className="danger">매진</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                     <>
                       <li>
                         <div className="row">
                           <div>구매수량</div>
                           <div>
                             <select
                               value={qty}
                               onChange={(e) => setQty(e.target.value)}
                             >
                               {[...Array(product.countInStock).keys()].map(
                                 (x) => (
                                   <option key={x + 1} value={x + 1}>
                                     {x + 1}
                                   </option>
                                 )
                               )}
                             </select>
                           </div>
                         </div>
                       </li>
                       <li>
                         <button
                           onClick={addToCartHandler} // 위에 addToCartHandler 함수 호출
                           className="primary block"
                         >
                           장바구니에 담기
                         </button>
                       </li>
                     </>
                   )}
                </ul>
              </div>
            </div>
                        </div>
                    </div>
      )}
            </div>
    );
}