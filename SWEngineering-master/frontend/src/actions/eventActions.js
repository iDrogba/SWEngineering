import Axios from 'axios';
import { EVENT_DETAILS_FAIL,
         EVENT_DETAILS_REQUEST,
         EVENT_DETAILS_SUCCESS, 
         EVENT_LIST_FAIL, 
         EVENT_LIST_REQUEST, 
         EVENT_LIST_SUCCESS,
         EVENT_CREATE_REQUEST,
         EVENT_CREATE_SUCCESS,
         EVENT_CREATE_FAIL,
         EVENT_UPDATE_REQUEST,
         EVENT_UPDATE_SUCCESS,
         EVENT_UPDATE_FAIL,
         EVENT_DELETE_REQUEST,
         EVENT_DELETE_FAIL,
         EVENT_DELETE_SUCCESS,
         EVENT_CATEGORY_LIST_SUCCESS,
         EVENT_CATEGORY_LIST_REQUEST,
         EVENT_CATEGORY_LIST_FAIL,
         EVENT_TOPSELLERS_LIST_REQUEST,
         EVENT_TOPSELLERS_LIST_SUCCESS,
         EVENT_TOPSELLERS_LIST_FAIL,
         EVENT_REVIEW_CREATE_REQUEST,
         EVENT_REVIEW_CREATE_SUCCESS,
         EVENT_REVIEW_CREATE_FAIL,
        } from "../constants/eventConstants"


export const listEvents = ({
  name='',
  category = '',
  order = '',
  min = 0,
  max = 0,
  rating = 0,
}) => async (dispatch) => {
    dispatch({
        type: EVENT_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get(
          `/api/events?name=${name}&category=${category}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
        dispatch({type: EVENT_LIST_SUCCESS , payload : data});
    } catch (error) {
        dispatch({type: EVENT_LIST_FAIL, payload: error.message});
        
    }
}

export const listEventCategories = () => async (dispatch) => {
  dispatch({
    type: EVENT_CATEGORY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/events/categories`);
    dispatch({ type: EVENT_CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: EVENT_CATEGORY_LIST_FAIL, payload: error.message });
  }
};

export const detailsEvent = (eventId) => async (dispatch) => {
    dispatch({ type: EVENT_DETAILS_REQUEST, payload: eventId });
    try {
      const { data } = await Axios.get(`/api/events/${eventId}`);
      dispatch({ type: EVENT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: EVENT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const createEvent = () => async (dispatch, getState) => {
    dispatch({ type: EVENT_CREATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post(
        '/api/events',
        {},
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: EVENT_CREATE_SUCCESS,
        payload: data.event,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_CREATE_FAIL, payload: message });
    }
  };

  export const updateEvent = (event) => async (dispatch, getState) => {
    dispatch({ type: EVENT_UPDATE_REQUEST, payload: event });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await Axios.put(`/api/events/${event._id}`, event, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
     dispatch({ type: EVENT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_UPDATE_FAIL, error: message });
    }
  };

  export const deleteEvent = (eventId) => async (dispatch, getState) => {
    dispatch({ type: EVENT_DELETE_REQUEST, payload: eventId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = Axios.delete(`/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: EVENT_DELETE_SUCCESS, payload:data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: EVENT_DELETE_FAIL, payload: message });
    }
  };

  export const listTopEvents = () => async (dispatch) => {
    dispatch({
        type: EVENT_TOPSELLERS_LIST_REQUEST
    });
    try {
        const { data } = await Axios.get(
          '/api/events/top-sellers');
        dispatch({type: EVENT_TOPSELLERS_LIST_SUCCESS , payload : data});
    } catch (error) {
        dispatch({type: EVENT_TOPSELLERS_LIST_FAIL, payload: error.message});
    }
}

export const createReview = (eventId, review) => async (dispatch, getState) => {
  dispatch({ type: EVENT_REVIEW_CREATE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.post(
      `/api/events/${eventId}/reviews`,
      review,
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: EVENT_REVIEW_CREATE_SUCCESS,
      payload: data.review,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: EVENT_REVIEW_CREATE_FAIL, payload: message });
  }
};