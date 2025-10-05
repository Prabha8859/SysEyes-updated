import { combineReducers } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
