import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    uid: null,
    loggedIn: false
}

const reducer = ( state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case actionTypes.AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null
            }
        case actionTypes.AUTH_SET_UID:
            return {
                ...state,
                uid: action.uid
            }
        case actionTypes.AUTH_REMOVE_UID:
            return {
                ...state,
                uid: null
            }
    }
    return state;
};

export default reducer;