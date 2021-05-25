import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  createProduct,
  deleteProduct,
  listProducts,
} from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET, } from '../constants/productConstants';

export default function ProductListScreen(props) {
  const { pageNumber = 1 } =useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;
// 상품 생성
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
// 상품 삭제
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({pageNumber}));
  }, [
    createdProduct, 
    dispatch, 
    props.history, 
    successCreate, 
    successDelete,
    pageNumber,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteProduct(product._id));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <div className="productlist_row">
        <h1>상품 목록</h1>
        <button type="button" className="primary" onClick={createHandler}>
          상품 추가하기
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <table className="table">
          <thead>
            <tr>
              <th>상품 ID</th>
              <th>이름</th>
              <th>가격</th>
              <th>분류</th>
              <th>브랜드</th>
              <th>수정하기</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    변경
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="row center pagination">
        {[...Array(pages).keys()].map((x) => (
            <Link 
              className={x + 1 === page ? 'active' : ''}
              key={x + 1} 
              to={`/productlist/pageNumber/${x + 1}`}
            >
              {x+1}
            </Link>
          ))}
      </div>
      </>
      )}
    </div>
  );
}
