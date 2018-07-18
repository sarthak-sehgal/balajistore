import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cart: {},
    carts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REMOVE_CART_PRODUCT_IN_STORE: {
            let cart = { ...state.cart };
            let newProducts = {};
            Object.keys(cart.products).map(key => {
                if (key !== action.id)
                    newProducts[key] = { ...cart.products[key] };
            });
            cart.products = {};
            const updatedCart = {
                ...cart,
                products: newProducts
            }
            return {
                ...state,
                cart: updatedCart
            }
        }
        case actionTypes.ADD_CART_PRODUCT_IN_STORE: {
            let cart = [...state.cart];
            let productDetails = {
                productKey: action.details.productKey,
                productName: action.details.productName,
                productDescription: action.details.productDescription,
                productPrice: action.details.productPrice,
                productQty: 1
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
                cart: { ...action.cart }
            }
        case actionTypes.UPDATE_QTY_IN_STORE:
            let cart = {...state.cart};
            Object.keys(cart.products).map(key => {
                if(key === action.id) {
                    cart.products[key].productQty = action.qty;
                }
            });
            return {
                ...state,
                cart: cart
            }
    }
    return state;
};

export default reducer;