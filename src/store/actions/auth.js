import * as actionTypes from './actionTypes';
import { AsyncStorage } from 'react-native';
import { uiStartLoading, uiStopLoading } from './index';
import { API_KEY } from '../../../firebaseConfig';
import startMain from '../../screens/StartMain/StartMain';

export const anonLogin = () => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .catch(err => {
                console.log(err);
                alert("Authentication failed! Please try again.");
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (parsedRes.error) {
                    alert("Authentication failed! Please try again.");
                    console.log(parsedRes);
                    dispatch(uiStopLoading());
                } else {
                    authStoreTokenDetails = { ...parsedRes };
                    dispatch(authStoreToken(
                        authStoreTokenDetails.idToken,
                        authStoreTokenDetails.expiresIn,
                        authStoreTokenDetails.refreshToken,
                        authStoreTokenDetails.localId
                    ));
                    console.log("Anon login worked!");
                    dispatch(uiStopLoading());
                    startMain();
                }
            });
    };
};

export const authStoreToken = (token, expiry, refreshToken, uid) => {
    return dispatch => {
        dispatch(authSetToken(token));
        dispatch(authSetUID(uid));
        const now = new Date();
        expiryDate = now.getTime() + expiry * 1000;
        AsyncStorage.setItem("auth-token", token);
        AsyncStorage.setItem("auth-uid", uid);
        AsyncStorage.setItem("auth-expiry", expiryDate.toString());
        AsyncStorage.setItem("auth-refreshToken", refreshToken);
    }
};

export const authSetToken = token => {
    return {
        type: actionTypes.AUTH_SET_TOKEN,
        token: token
    }
};

export const authGetToken = () => {
    console.log(API_KEY);
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if (!token) {
                let fetchedToken;
                AsyncStorage.getItem("auth-token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        fetchedToken = tokenFromStorage;
                        return AsyncStorage.getItem("auth-expiry");
                    })
                    .then(expiry => {
                        const parsedExpiry = new Date(parseInt(expiry));
                        const now = new Date();
                        if (parsedExpiry > now) {
                            dispatch(authSetToken(fetchedToken));
                            AsyncStorage.getItem("auth-uid")
                                .catch(err => alert('Error occurred, please reopen app!'))
                                .then(uidFromStorage => {
                                    dispatch(authSetUID(uidFromStorage));
                                })
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject())
            } else {
                resolve(token);
            }
        });
        return promise.catch(err => {
            return AsyncStorage.getItem("auth-refreshToken")
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                    })
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (parsedRes.id_token) {
                        console.log("Refresh token worked!");
                        dispatch(authStoreToken(
                            parsedRes.id_token,
                            parsedRes.expires_in,
                            parsedRes.refresh_token,
                            parseRes.user_id
                        ));
                        return parsedRes.id_token;
                    } else {
                        dispatch(authClearStorage());
                    }
                })
                .then(token => {
                    if (!token) {
                        dispatch(anonLogin());
                        throw (new Error("Token not found!"));
                    } else {
                        return token;
                    }
                });
        });
    }
};

export const autoAnonSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => startMain())
            .catch(err => {
                dispatch(anonLogin());
                console.log("Failed to fetch token!")
            }
            );
    }
}

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("auth-token");
        AsyncStorage.removeItem("auth-expiry");
        return AsyncStorage.removeItem("auth-refreshToken");
    }
}

export const authSetUID = uid => {
    return {
        type: actionTypes.AUTH_SET_UID,
        uid: uid
    }
}