import { UI_START_LOADING, UI_STOP_LOADING, CART_START_LOADING, CART_STOP_LOADING, PRODUCTS_START_LOADING, PRODUCTS_STOP_LOADING } from "../actions/actionTypes";

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const cartStartLoading = () => {
    return {
        type: CART_START_LOADING
    };
};

export const cartStopLoading = () => {
    return {
        type: CART_STOP_LOADING
    };
};

export const productsStartLoading = () => {
    return {
        type: PRODUCTS_START_LOADING
    };
};

export const productsStopLoading = () => {
    return {
        type: PRODUCTS_STOP_LOADING
    };
};