import { createStore, combineReducers } from "redux";
import { ADD_POST, REMOVE_POST } from "./constants";

const initialState = {
  posts: [],
};
const userinitialState = {
  users: [],
};

const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

const removeUserAction = (id) => {
  return {
    type: REMOVE_USER,
    id,
  };
};

const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.post],
      };
    case REMOVE_POST:
      return {
        posts: state.posts.filter((post) => {
          return post.id !== action.id;
        }),
      };
  }
  return state;
};

const userReducer = (state = userinitialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        users: [...state.users, action.post],
      };
    case REMOVE_USER:
      return {
        users: state.users.filter((user) => {
          return user.id !== action.id;
        }),
      };
  }
  return state;
};

const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

const store = createStore(rootReducer);

store.dispatch(
  addPostAction({
    id: 1,
    title: "Best Course",
  })
);
