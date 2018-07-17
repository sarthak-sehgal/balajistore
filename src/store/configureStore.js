import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';
import productsReducer from './reducers/products';
import cartReducer from './reducers/cart';

export default configureStore = () => {
    let composeEnhancers = compose;

    if (__DEV__) {
        composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    }

    const rootReducer = combineReducers({
        ui: uiReducer,
        auth: authReducer,
        products: productsReducer,
        cart: cartReducer
    });

    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
};