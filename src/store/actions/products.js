import * as actionTypes from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

// export const getProducts = () => {
//     return dispatch => {
//         dispatch(uiStartLoading());
//         // dispatch(authGetToken())
//             // .then(token => {
//                 fetch("https://native-shopping-app.firebaseio.com/products.json?auth=" + token)
//                     .catch(err => {
//                         console.log(err);
//                         dispatch(uiStopLoading());
//                         alert("Oops! Something went wrong. Failed to load products.");
//                     })
//                     .then(res => res.json())
//                     .then(parsedRes => {
//                         const products = [];
//                         for (let key in parsedRes) {
//                             products.push({
//                                 ...parsedRes[key],
//                                 key: key
//                             });
//                         };
//                         dispatch(setProducts(products));
//                         dispatch(uiStopLoading());
//                     })
//             // })
//     }
// };