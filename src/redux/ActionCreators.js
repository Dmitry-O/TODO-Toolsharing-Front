import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchTools = () => (dispatch) => {
    dispatch(toolsLoading(true));

    return fetch(baseUrl + 'tools', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok)
                return response;
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(tools => dispatch(addTools(tools)))
        .catch(error => dispatch(toolsFailed(error.message)));
}

export const toolsLoading = () => ({
    type: ActionTypes.TOOLS_LOADING
});

export const toolsFailed = (errmess) => ({
    type: ActionTypes.TOOLS_FAILED,
    payload: errmess
});

export const addTools = (tools) => ({
    type: ActionTypes.ADD_TOOLS,
    payload: tools
});

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            if (response.status === 401) {
                return fetch(baseUrl + 'users/signup', {
                    method: 'POST',
                    headers: { 
                        'Content-Type':'application/json' 
                    },
                    body: JSON.stringify(creds)
                })
                .then(response => {
                    if (response.ok) {
                        return fetch(baseUrl + 'users/login', {
                            method: 'POST',
                            headers: { 
                                'Content-Type':'application/json' 
                            },
                            body: JSON.stringify(creds)
                        })
                        .then(response => {
                            if (response.ok)
                                return response;
                            else {
                                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                                error.response = response;
                                throw error;
                            }
                        },
                        error => { throw error; }
                        )
                    }
                    else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                error => { throw error; }
                )
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            //dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
            console.log(receiveLogin(response).token);
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    //dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}

export const postWishlist = (toolId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'wishlist/' + toolId, {
        method: "POST",
        body: JSON.stringify({"_id": toolId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(wishlist => { console.log('Wishlist Added', wishlist); dispatch(addWishlist(wishlist)); })
    .catch(error => dispatch(wishlistFailed(error.message)));
}

export const deleteWishlist = (toolId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'wishlist/' + toolId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(wishlist => { console.log('Wishlist Deleted', wishlist); dispatch(addWishlist(wishlist)); })
    .catch(error => dispatch(wishlistFailed(error.message)));
};

export const fetchWishlist = () => (dispatch) => {
    dispatch(wishlistLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'wishlist', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(wishlist => dispatch(addWishlist(wishlist)))
    .catch(error => dispatch(wishlistFailed(error.message)));
}

export const wishlistLoading = () => ({
    type: ActionTypes.WISHLIST_LOADING
});

export const wishlistFailed = (errmess) => ({
    type: ActionTypes.WISHLIST_FAILED,
    payload: errmess
});

export const addWishlist = (wishlist) => ({
    type: ActionTypes.ADD_WISHLIST,
    payload: wishlist
});


export const postRentedTools = (rentedTool) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'rentedTools', {
        method: "POST",
        body: JSON.stringify(rentedTool),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(rentedTools => { console.log('RentedTools Added', rentedTools); dispatch(addRentedTools(rentedTools)); })
    .catch(error => dispatch(rentedToolsFailed(error.message)));
}

export const fetchRentedTools = () => (dispatch) => {
    dispatch(rentedToolsLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'rentedTools', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(rentedTools => dispatch(addRentedTools(rentedTools)))
    .catch(error => dispatch(rentedToolsFailed(error.message)));
}

export const rentedToolsLoading = () => ({
    type: ActionTypes.RENTEDTOOLS_LOADING
});

export const rentedToolsFailed = (errmess) => ({
    type: ActionTypes.RENTEDTOOLS_FAILED,
    payload: errmess
});

export const addRentedTools = (rentedTools) => ({
    type: ActionTypes.ADD_RENTEDTOOLS,
    payload: rentedTools
});

export const putAccount = (info) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/account', {
        method: "PUT",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(info => { console.log('Account info Changed!', info); dispatch(addAccount(info)); })
    .catch(error => dispatch(accountFailed(error.message)));
}

export const fetchAccount = () => (dispatch) => {
    dispatch(accountLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'users/account', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(account => dispatch(addAccount(account)))
    .catch(error => dispatch(accountFailed(error.message)));
}

export const returnAccount = () => (dispatch) => {
    //dispatch(accountLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    var resp; 

    fetch(baseUrl + 'users/account', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => { 
        response.json();
        resp = response.json();  
    })
    .catch(err => console.log("Error! " + err));

    return resp;
}

export const accountLoading = () => ({
    type: ActionTypes.ACCOUNT_LOADING
});

export const accountFailed = (errmess) => ({
    type: ActionTypes.ACCOUNT_FAILED,
    payload: errmess
});

export const addAccount = (account) => ({
    type: ActionTypes.ADD_ACCOUNT,
    payload: account
});