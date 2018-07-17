import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: {},
    carts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_PRODUCT_IN_STORE: {
            let updatedProducts = [...state.searchResults];
            updatedProducts = updatedProducts.filter(product => {
                return product.key !== action.key;
            });
            return {
                ...state,
                searchResults: updatedProducts
            }
        }
        case actionTypes.ADD_CART_PRODUCT_IN_STORE: {
            let cart = [...state.cart];
            let productDetails = {
                productKey: action.details.productKey,
                productName: action.details.productName,
                productDescription: action.details.productDescription,
                productPrice: action.details.productPrice
            };
            cart.push(productDetails);
            return {
                ...state,
                cart: cart
            }
        }
        case actionTypes.SET_CARTS:
            return {
                ...state,
                carts: [...action.carts]
            }
        case actionTypes.SET_CART:
            return {
                ...state,
                cart: {...action.cart}
            }
    }
    return state;
};

export default reducer;