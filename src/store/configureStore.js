import { createStore, combineReducers } from 'redux';

// import productReducer from '';

const rootReducer = combineReducers({
    // products: productsReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;