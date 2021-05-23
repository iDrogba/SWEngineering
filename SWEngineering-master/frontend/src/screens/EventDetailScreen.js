/* 제품 클릭 시 화면 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsEvent } from '../actions/eventActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function EventDetailScreen(props) {
    const dispatch = useDispatch();
    const eventId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const eventDetails = useSelector((state) => state.eventDetails);
    const { loading, error, event } = eventDetails;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
      
      dispatch(detailsEvent(eventId));
    }, [dispatch, eventId]);

 

  


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
                src={event.image}
                alt={event.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{event.name}</h1>
                </li>
              
                <li>
                  상품설명:
                  <p>{event.description}</p>
                </li>
              </ul>
            </div>
           
                        </div>
                        
                    </div>
      )}
            </div>
    );
}