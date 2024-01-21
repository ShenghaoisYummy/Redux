const { createStore, applyMiddleware } = require("redux");
const loggerMiddleware = require("redux-logger").createLogger();

//initial state
const initialState = {
  posts: [],
};

const customLogger = () => {
  return (next) => {
    return (action) => {
      console.log("Action fired", action);
      next(action);
    };
  };
};
//Actions
const fetchPostRequest = () => {
  return {
    type: "REQUESTED_STARTED",
  };
};

const fetchPostSuccess = () => {
  return {
    type: "FETCH_SUCCESS",
  };
};

const fetchPostFailed = () => {
  return {
    type: "FETCH_FAILED",
  };
};

// Reducers

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUESTED_STARTED":
      return {
        posts: ["HTML"],
      };
  }
};

// store

const store = createStore(postsReducer, applyMiddleware(loggerMiddleware, customLogger));

store.subscribe(() => {
  const data = store.getState();
  console.log(data);
});

// dispatch

store.dispatch(fetchPostRequest());
