import { createStore } from "redux";

const initialState = {
  role: null,
};

const SET_ROLE = "SET_ROLE";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
