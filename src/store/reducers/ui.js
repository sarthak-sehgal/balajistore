import { UI_START_LOADING, UI_STOP_LOADING, CART_START_LOADING, CART_STOP_LOADING, PRODUCTS_START_LOADING, PRODUCTS_STOP_LOADING } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  cartLoading: false,
  productsLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case CART_START_LOADING:
      return {
        ...state,
        cartLoading: true
      };
    case CART_STOP_LOADING:
      return {
        ...state,
        cartLoading: false
      };
    case PRODUCTS_START_LOADING:
      return {
        ...state,
        productsLoading: true
      };
    case PRODUCTS_STOP_LOADING:
      return {
        ...state,
        productsLoading: false
      };
    default:
      return state;
  }
};

export default reducer;