/* 홈 화면 */ 

import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector} from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error , products} = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const { 
    loading: loadingSellers, 
    error: errorSellers, 
    products: sellers,
  } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch])
    return(
        /* Top Seller */
        <div>
          <h2>인기 상품</h2>
          {loadingSellers? (<LoadingBox></LoadingBox>) 
          : errorSellers ? (<MessageBox variant="danger">{error}</MessageBox>)
          : (
            <>
            {products.length ===0 && <MessageBox>No Seller Found</MessageBox>}
            <Carousel showArrows autoPlay showThumbs={false}>
              {sellers.map((seller) => (
                <div key={seller._id}>
                  <Link to={`${seller._id}`}>
                    <img src={seller.image} alt={seller.name}/>
                    <p className="legend">{seller.name}</p>
                  </Link>
                </div>
              ))}
            </Carousel>
            </>
            /*
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} ></Product>
            ))}
          </div>

            */
          )}
          <h2> 전체 상품 목록 </h2>
          {loading? (
          <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
              {products.length ===0 && <MessageBox>No Product Found</MessageBox>}
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