import { 
    EVENT_LIST_FAIL, 
    EVENT_LIST_REQUEST, 
    EVENT_LIST_SUCCESS,
    EVENT_DETAILS_REQUEST,
    EVENT_DETAILS_SUCCESS,
    EVENT_DETAILS_FAIL,
    EVENT_CREATE_REQUEST,
    EVENT_CREATE_SUCCESS,
    EVENT_CREATE_FAIL,
    EVENT_CREATE_RESET,
    EVENT_UPDATE_REQUEST,
    EVENT_UPDATE_SUCCESS,
    EVENT_UPDATE_FAIL,
    EVENT_UPDATE_RESET,
    EVENT_DELETE_REQUEST,
    EVENT_DELETE_SUCCESS,
    EVENT_DELETE_FAIL,
    EVENT_DELETE_RESET,
    EVENT_CATEGORY_LIST_REQUEST,
    EVENT_CATEGORY_LIST_SUCCESS,
    EVENT_CATEGORY_LIST_FAIL,
    EVENT_TOPSELLERS_LIST_REQUEST,
    EVENT_TOPSELLERS_LIST_SUCCESS,
    EVENT_TOPSELLERS_LIST_FAIL,
    EVENT_REVIEW_CREATE_REQUEST,
    EVENT_REVIEW_CREATE_SUCCESS,
    EVENT_REVIEW_CREATE_FAIL,
    EVENT_REVIEW_CREATE_RESET,
  } from "../constants/eventConstants";

export const eventsListReducer = (state = {loading:true, events: []}, action) => {
    switch(action.type){
        case EVENT_LIST_REQUEST:
            return {loading: true};
        case EVENT_LIST_SUCCESS:
            return {loading: false, events: action.payload};
        case EVENT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
        }   
};

export const eventCategoryListReducer = (
  state = { loading: true, events: [] },
  action
) => {
  switch (action.type) {
    case EVENT_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case EVENT_CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case EVENT_CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
      case EVENT_DETAILS_REQUEST:
        return { loading: true };
      case EVENT_DETAILS_SUCCESS:
        return { loading: false, event: action.payload };
      case EVENT_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const eventCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_CREATE_REQUEST:
        return { loading: true };
      case EVENT_CREATE_SUCCESS:
        return { loading: false, success: true, event: action.payload };
      case EVENT_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const eventUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_UPDATE_REQUEST:
        return { loading: true };
      case EVENT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case EVENT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const eventDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENT_DELETE_REQUEST:
        return { loading: true };
      case EVENT_DELETE_SUCCESS:
        return { loading: false, success: true };
      case EVENT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case EVENT_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };

  export const eventTopSellerListReducer = (state = {loading:true, events: []}, action) => {
    switch(action.type){
        case EVENT_TOPSELLERS_LIST_REQUEST:
            return {loading: true};
        case EVENT_TOPSELLERS_LIST_SUCCESS:
            return {loading: false, events: action.payload};
        case EVENT_TOPSELLERS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
        }   
};

export const eventReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case EVENT_REVIEW_CREATE_SUCCESS:
      return { loading: false, success: true, review: action.payload };
    case EVENT_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case EVENT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};