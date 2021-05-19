/* 제품 클릭 시 화면 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { 
      loading: loadingReviewCreate, 
      error: errorReviewCreate, 
      success: successReviewCreate,
    } = productReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
      if(successReviewCreate) {
        window.alert('리뷰 등록 완료');
        setRating('');
        setComment('');
        dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
      }
      dispatch(detailsProduct(productId));
    }, [dispatch, productId, successReviewCreate]);

    const addToCartHandler = () => {
      props.history.push(`/cart/${productId}?qty=${qty}`);
    };

    const submitHandler = (e) => {
      e.preventDefault();
      if(comment && rating) {
        dispatch(
          createReview(productId, {rating, comment, name: userInfo.name})
        );
      } else {
        alert('별점과 평가 작성을 해주십시오.')
      }
    };

    return(
        <div>
            {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product_page">
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
                        <div>
                          <h2 id="reviews">
                            리뷰
                          </h2>
                          {product.reviews.length === 0 && (
                            <MessageBox>리뷰가 없습니다.</MessageBox>
                          )}
                          <ul>
                            {product.reviews.map((review) => (
                              <li key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating rating={review.rating} caption=" "></Rating>
                                <p>{review.createdAt.substring(0,10)}</p>
                                <p>{review.comment}</p>
                              </li>
                            ))}
                            <li>
                              {userInfo ? (
                                <form className="form" onSubmit={submitHandler}>
                                  <div>
                                    <h2>리뷰 작성하기</h2>
                                  </div>
                                  <div>
                                    <label htmlFor="rating">별점</label>
                                    <select 
                                      id="rating" 
                                      value={rating}
                                      onChange={(e) => setRating(e.target.value)}
                                    >
                                      <option value="">선택</option>
                                      <option value="1">1 - 매우 나쁘다</option>
                                      <option value="2">2 - 나쁘다</option>
                                      <option value="3">3 - 보통이다</option>
                                      <option value="4">4 - 좋다</option>
                                      <option value="5">5 - 매우 좋다</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label htmlFor="comment">평가</label>
                                    <textarea 
                                      id="comment" 
                                      value={comment} 
                                      onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                  </div>
                                  <div>
                                    <label />
                                    <button className="primary" type="submit">
                                      입력
                                    </button>
                                  </div>
                                  <div>
                                  {loadingReviewCreate && <LoadingBox></LoadingBox>}
                                  {errorReviewCreate && (
                                    <MessageBox variant="danger">
                                      {errorReviewCreate}
                                    </MessageBox>
                                  )}
                                  </div>
                                </form>
                              ) : (
                                <MessageBox>
                                  리뷰를 작성하기 위해 <Link to="/signin">로그인</Link>하세요.
                                </MessageBox>
                              )}
                            </li>
                          </ul>
                        </div>
                    </div>
      )}
            </div>
    );
}