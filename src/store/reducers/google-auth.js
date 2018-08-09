import * as actionTypes from '../actions/actionTypes';

const initialState = {
    user: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.GOOGLE_SET_USER: {
            return {
                ...state,
                user: action.user
            }
        }
    }
    return state;
}

export default reducer;