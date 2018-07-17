import * as actionTypes from './actionTypes';
import { cartStartLoading, cartStopLoading, authGetToken } from './index';
import { BASE_URL } from '../../../firebaseConfig';

export const addProduct = (cartDetails) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(cartStartLoading());
            dispatch(authGetToken())
                .then(token => {
                    dispatch(getCartsFromDb())
                        .then(success => {
                            let cart = (getState().cart.carts);
                            cart = cart.filter(el => {
                                return el.uid === cartDetails.uid;
                            });
                            if (cart[0]) {
                                let exists = false;
                                if (cart[0].products) {
                                    for (let key in cart[0].products) {
                                        if (key === cartDetails.key) {
                                            exists = true;
                                        }
                                    }
                                };
                                console.log("works");
                                if (!exists) {
                                    let newProduct = {};
                                    newProduct[cartDetails.key] = {
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
                                            dispatch(cartStopLoading());
                                            alert("Failed to add product! Please try again.");
                                            reject();
                                        })
                                        .then(res => res.json())
                                        .then(parsedRes => {
                                            if (parsedRes.error) {
                                                console.log(parsedRes);
                                                dispatch(cartStopLoading());
                                                alert("Failed to add product! Please try again.");
                                                reject();
                                            } else {
                                                dispatch(addCartProductInStore(cartDetails));
                                                dispatch(cartStopLoading());
                                                dispatch(getCart(getState().auth.uid))
                                                    .then(result => console.log(result))
                                                    .catch(err => alert("Failed to update user cart!"));
                                                resolve("added");
                                            }
                                        });
                                } else {
                                    resolve("exists");
                                }
                            } else {
                                let newProduct = {};
                                newProduct[cartDetails.key] = {
                                    productDescription: cartDetails.description,
                                    productKey: cartDetails.key,
                                    productName: cartDetails.name,
                                    productPrice: cartDetails.price
                                }
                                fetch(BASE_URL + "/cart.json?auth=" + token, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        uid: cartDetails.uid,
                                        products: {
                                            ...newProduct
                                        }
                                    }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                    .catch(error => {
                                        console.log(err);
                                        dispatch(cartStopLoading());
                                        alert("Failed to add product! Please try again.");
                                        reject();
                                    })
                                    .then(res => res.json())
                                    .then(parsedRes => {
                                        if (parsedRes.error) {
                                            console.log(parsedRes);
                                            dispatch(cartStopLoading());
                                            alert("Failed to add product! Please try again.");
                                            reject();
                                        } else {
                                            dispatch(addCartProductInStore(cartDetails));
                                            dispatch(cartStopLoading());
                                            dispatch(getCart())
                                                .then(result => console.log(result))
                                                .catch(err => alert("Failed to update user cart!"));
                                            resolve("added");
                                        }
                                    });
                            }
                        })
                        .catch(err => {
                            dispatch(cartStopLoading());
                            alert("Oops! Something went wrong.");
                            reject();
                        });


                })
                .catch(err => {
                    console.log(err);
                    dispatch(cartStopLoading());
                    alert("Failed to add product! Please try again.");
                    reject();
                });
        })
    }
};

export const addCartProductInStore = (cartDetails) => {
    return {
        type: actionTypes.ADD_CART_PRODUCT_IN_STORE,
        details: cartDetails
    }
};

export const getCartsFromDb = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(authGetToken())
                .then(token => {
                    fetch(BASE_URL + "/cart.json?auth=" + token)
                        .catch(err => {
                            console.log(err);
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

export const getCart = (uid) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(cartStartLoading());
            dispatch(getCartsFromDb())
                .catch(err => {
                    dispatch(cartStopLoading());
                    alert("Error loading cart!")
                })
                .then(success => {
                    let cart = getState().cart.carts;
                    cart = cart.filter(el => {
                        return el.uid === uid;
                    });
                    if (cart.length > 0) {
                        dispatch(setCart(cart[0]));
                        dispatch(cartStopLoading());
                        resolve();
                    } else {
                        dispatch(cartStopLoading());
                        reject();
                    }
                });
        });
    }
}

export const setCart = (cart) => {
    return {
        type: actionTypes.SET_CART,
        cart: cart
    }
}