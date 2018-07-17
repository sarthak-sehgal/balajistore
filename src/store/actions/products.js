import * as actionTypes from './actionTypes';
import { productsStartLoading, productsStopLoading, authGetToken } from './index';

export const getProducts = () => {
    return dispatch => {
        dispatch(productsStartLoading());
        dispatch(authGetToken())
            .then(token => {
                fetch("https://native-shopping-app.firebaseio.com/products.json?auth=" + token)
                    .catch(err => {
                        console.log(err);
                        dispatch(productsStopLoading());
                        alert("Oops! Something went wrong. Failed to load products.");
                        return;
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        const products = [];
                        for (let key in parsedRes) {
                            products.push({
                                ...parsedRes[key],
                                key: key
                            });
                        };
                        dispatch(setProducts(products));
                        dispatch(productsStopLoading());
                    })
            })
    }
};

export const setProducts = (products) => {
    return {
        type: actionTypes.SET_PRODUCTS,
        products: products
    }
};

export const searchProducts = (query) => {
    return {
        type: actionTypes.SEARCH_PRODUCTS,
        searchQuery: query
    }
};