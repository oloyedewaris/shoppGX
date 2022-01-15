import {
  GET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  CHANGE_ITEM_QUANTITY,
  ON_SUCCESS_BUY
} from "../actions/types";

const initialState = {
  products: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      if (action.payload && action.payload.products) {
        return {
          ...state,
          products: action.payload.products
        };
      } else {
        return {
          ...state,
        };
      }
    case DELETE_PRODUCT:
      if (action.payload && action.payload.products) {
        return {
          ...state,
          products: action.payload.products
        };
      } else {
        return {
          ...state,
        };
      }
    case ADD_TO_CART:
      if (action.payload && action.payload.products) {
        return {
          ...state,
          products: action.payload.products
        };
      } else {
        return {
          ...state,
        };
      }
    case REMOVE_CART_ITEM:
      if (action.payload && action.payload.products) {
        return {
          ...state,
          products: action.payload.products
        };
      } else {
        return {
          ...state,
        };
      }
    case CHANGE_ITEM_QUANTITY:
      if (action.payload && action.payload.products) {
        return {
          ...state,
          products: action.payload.products
        };
      } else {
        return {
          ...state,
        };
      }
    case ON_SUCCESS_BUY:
      if (action.payload && action.payload.products) {
        return {
          ...state,
          products: action.payload.products
        };
      } else {
        return {
          ...state,
        };
      }
    default:
      return state;
  }
}

export default reducer;