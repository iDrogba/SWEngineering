/* 홈 화면 */ 

import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/productActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error , products} = productList;

  const productTopSellersList = useSelector((state) => state.productTopSellersList);
  const { 
    loading: loadingSellers, 
    error: errorSellers, 
    products: sellers,
  } = productTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch])
    return(
        /* Top Seller */
        <div className="topseller_main">
          <h2>이벤트 및 공지</h2>
          {loadingSellers? (<LoadingBox></LoadingBox>) 
          : errorSellers ? (<MessageBox variant="danger">{error}</MessageBox>)
          : (
            <>
            {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel showArrows autoPlay showThumbs={false}>
              {sellers.map((seller) => (
                <div key={seller._id}>
                  <Link to={`/product/${seller._id}`}>
                    <img src={seller.image} alt={seller.name}/>
                    <p className="legend">{seller.name}</p>
                  </Link>
                </div>
              ))}
            </Carousel>
            </>
          )}



          <h2> 전체 상품 목록 </h2>
          {loading? (
          <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
              {products.length ===0 && <MessageBox>찾으시는 상품이 없습니다.</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} ></Product>
            ))}
          </div>
          </>
          )}
    </div>
    );
}