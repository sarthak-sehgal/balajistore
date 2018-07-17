import * as actionTypes from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';
import { BASE_URL } from '../../../firebaseConfig';

export const addProduct = (cartDetails) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then(token => {
                dispatch(getCarts())
                    .then(success => {
                        let cart = (getState().cart.carts);
                        cart = cart.filter(el => {
                            return el.uid === cartDetails.uid;
                        });
                        if (cart[0]) {
                            let exists = false;
                            if (cart[0].products) {
                                cart[0].products.map(el => {
                                    if (el.productKey === cartDetails.key) {
                                        exists = true;
                                    }
                                });
                            };
                            if (!exists) {
                                let newProduct = {};
                                let productCount = 0;
                                if(cart[0].products) {
                                    productCount = cart[0].products.length;
                                }
                                newProduct[productCount] = {
                                    productDescription: cartDetails.description,
                                    productKey: cartDetails.key,
                                    productName: cartDetails.name,
                                    productPrice: cartDetails.price
                                }

                                fetch(BASE_URL + "/cart/" + cart[0].key + "/products.json?auth=" + token, {
                                    method: "PATCH",
                                    body: JSON.stringify({
                                        ...newProduct
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .catch(error => {
                                        console.log(err);
                                        dispatch(uiStopLoading());
                                        alert("Failed to add product! Please try again.");
                                    })
                                    .then(res => res.json())
                                    .then(parsedRes => {
                                        if (parsedRes.error) {
                                            console.log(parsedRes);
                                            dispatch(uiStopLoading());
                                            alert("Failed to add product! Please try again.");
                                        } else {
                                            dispatch(addCartProductInStore(cartDetails));
                                            dispatch(uiStopLoading());
                                            alert("Product added!");
                                        }
                                    });
                            } else {
                                alert("Product exists in cart!");
                            }
                        } else {
                            fetch(BASE_URL + "/cart.json?auth=" + token, {
                                method: "POST",
                                body: JSON.stringify({
                                    uid: cartDetails.uid,
                                    products: {
                                        0: {
                                            productDescription: cartDetails.description,
                                            productName: cartDetails.name,
                                            productPrice: cartDetails.price,
                                            productKey: cartDetails.key
                                        }
                                    }
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .catch(error => {
                                    console.log(err);
                                    dispatch(uiStopLoading());
                                    alert("Failed to add product! Please try again.");
                                })
                                .then(res => res.json())
                                .then(parsedRes => {
                                    if (parsedRes.error) {
                                        console.log(parsedRes);
                                        dispatch(uiStopLoading());
                                        alert("Failed to add product! Please try again.");
                                    } else {
                                        dispatch(addProductInStore(cartDetails));
                                        dispatch(uiStopLoading());
                                        alert("Product added!");
                                    }
                                });
                        }
                    })
                    .catch(err => {
                        alert("Oops! Something went wrong.");
                    });


            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
                alert("Failed to add product! Please try again.");
            })
    }
};

export const addCartProductInStore = (cartDetails) => {
    return {
        type: actionTypes.ADD_CART_PRODUCT_IN_STORE,
        details: cartDetails
    }
};

export const getCarts = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(uiStartLoading());
            dispatch(authGetToken())
                .then(token => {
                    fetch(BASE_URL + "/cart.json?auth=" + token)
                        .catch(err => {
                            console.log(err);
                            dispatch(uiStopLoading());
                            alert("Oops! Something went wrong. Failed to load cart.");
                            reject();
                        })
                        .then(res => res.json())
                        .then(parsedRes => {
                            const carts = [];
                            for (let key in parsedRes) {
                                carts.push({
                                    ...parsedRes[key],
                                    key: key
                                });
                            };
                            dispatch(setCarts(carts));
                            dispatch(uiStopLoading());
                            resolve();
                        })
                })
                .catch(err => {
                    console.log(err);
                });
        })
    }
};

export const setCarts = (carts) => {
    return {
        type: actionTypes.SET_CARTS,
        carts: carts
    }
};