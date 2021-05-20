import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createEvent,
  deleteEvent,
  listEvents,
} from '../actions/eventActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { EVENT_CREATE_RESET, EVENT_DELETE_RESET, } from '../constants/eventConstants';

export default function EventScreen(props) 
{
  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;
// 이벤트, 공지 생성
  const eventCreate = useSelector((state) => state.eventCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    event: createdEvent,
  } = eventCreate;
// 이벤트, 공지 삭제
  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = eventDelete

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: EVENT_CREATE_RESET });
      props.history.push(`/event/${createdEvent._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: EVENT_DELETE_RESET });
    }
    dispatch(listEvents({}));
  }, [createdEvent, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (event) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deleteEvent(event._id));
    }
  };
  const createHandler = () => {
    dispatch(createEvent());
  };
  return (
    <div>
      <div className="productlist_row">
        <h1>이벤트 및 공지</h1>
        <button type="button" className="primary" onClick={createHandler}>
          이벤트 및 공지 추가하기
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
        <table className="table">
          <thead>
            <tr>
              <th>이벤트 ID</th>
              <th>제목</th>
              <th>유효기간</th>
              <th>분류</th>
              <th>브랜드</th>
              <th>수정하기</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id}>
                <td>{event._id}</td>
                <td>{event.name}</td>
                <td>{event.price}</td>
                <td>{event.category}</td>
                <td>{event.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/event/${event._id}/edit`)
                    }
                  >
                    변경
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(event)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
