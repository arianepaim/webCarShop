import { createStore } from "redux";

// Defina o estado inicial
const initialState = {
  role: null,
};

// Defina as ações
const SET_ROLE = "SET_ROLE";

// Defina o reducer
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

// Crie a store
const store = createStore(reducer);

export default store;
