import * as actionTypes from './actionTypes';

export const googleSetUser = (user) => {
    return {
        type: actionTypes.GOOGLE_SET_USER,
        user: user
    }
}