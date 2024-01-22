const { applyMiddleware, createStore } = require("redux");
const axios = require("axios");
const thunkMiddleware = require("redux-thunk").default;

// Action constants
const REQUESTED_STARTED = "REQUESTED_STARTED";
const FETCH_FAILED = "FETCH_FAILED";
const FETCH_SUCCESS = "FETCH_SUCCESS";
//initial state
const initialState = {
  posts: [],
  error: "",
  loading: false,
};

// Async action creator
const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(fetchPostRequest);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(fetchPostSuccess(response));
    } catch (error) {
      dispatch(fetchPostFailed(error.message));
    }
  };
};

//Actions
const fetchPostRequest = () => {
  return {
    type: REQUESTED_STARTED,
  };
};

const fetchPostSuccess = (posts) => {
  return {
    type: FETCH_SUCCESS,
    payload: posts,
  };
};

const fetchPostFailed = (error) => {
  return {
    type: FETCH_FAILED,
    playload: error,
  };
};

// Reducers

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUESTED_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case FETCH_FAILED:
      return {
        ...state,
        posts: [],
        error: action.payload,
        loading: false,
      };
  }
};

// store

const store = createStore(postsReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

// dispatch

store.dispatch(fetchPosts());
