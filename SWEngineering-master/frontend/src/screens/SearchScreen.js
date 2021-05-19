import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
    const {
      name ='all', 
      category = 'all',
      min = 0,
      max = 0,
      rating = 0,
      order = 'newest',
      pageNumber = 1,
    } =useParams();
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

    useEffect(() => {
        dispatch(
            listProducts({
              pageNumber,
              name: name !== 'all' ? name : '',
              category: category !== 'all' ? category : '',
              min,
              max,
              rating,
              order,
            })
          );
        }, [category, dispatch, max, min, name, order, rating, pageNumber]);
      
        const getFilterUrl = (filter) => {
          const filterPage = filter.page || pageNumber;
          const filterCategory = filter.category || category;
          const filterName = filter.name || name;
          const filterRating = filter.rating || rating;
          const sortOrder = filter.order || order;
          const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
          const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
          return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
        };
    return (
    <div>
        <div className="row">
        {loading?(
            <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="results">{products.length}개의 검색 결과</div>
            )}
            <div className='sortby'>
          다음으로 분류하기 {' '}
          <select
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }));
            }}
          >
            <option value="newest">신상품</option>
            <option value="lowest">낮은 가격부터</option>
            <option value="highest">높은 가격부터</option>
            <option value="toprated">별점 순</option>
          </select>
        </div>
        </div>
        <div className="row top">
            <div className="col-1">
                <h3>카테고리</h3>
                <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    모든 결과
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3>가격</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link
                    to={getFilterUrl({ min: p.min, max: p.max })}
                    className={
                      `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            </div>
          <div>
            <h3>별점 순</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? 'active' : ''}
                  >
                    <Rating caption={' 이상'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
            </div>
            <div className="col-3">
            {loading?(
            <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
              {products.length ===0 && <MessageBox>검색된 제품이 없습니다.</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product} ></Product>
            ))}
          </div>
          <div class="row center pagination">
            {[...Array(pages).keys()].map(x => (
                <Link className={x + 1 === page?'active': ''}
                  key={x + 1} 
                  to={getFilterUrl({ page: x + 1})}
                >
                  {x+1}
                </Link>
              ))}
          </div>
          </>
            )}
            </div>
        </div>
    </div>
    );
}