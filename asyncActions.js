const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')

const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

// async actions with redux

// to perform async actions we use the thunk middleware -> middlewares are like other libraries that add extended functionalities to redux.

// for async we need to create 4 things in general:
/**
 * 1. we need an initial state
 * 2. we need actions and action creators
 * 3. we will need a reducer function and a store
 * 4. we will need to apply a middleware plus an action function that uses dispatch method to send request.
 */

// 1. initial state:
const initialState = {
  loading: false,
  users: [],
  error: "",
};

// action types:
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_ERROR = "FETCH_USER_ERROR";

// action creators
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetchUserError = (error) => {
  return {
    type: FETCH_USER_ERROR,
    payload: error,
  };
};

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        loading: true,
      }
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USER_ERROR:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    default: 
      return state
  }
};

// create a request function:
const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUserRequest())
    axios.get("https://jsonplaceholder.typicode.com/users/")
      .then(response => {
        const users = response.data.map(user => user.name)
        dispatch(fetchUserSuccess(users))
      })
      .catch(error => {
        error = error.message
        dispatch(fetchUserError(error))
      })
  }
}


// createe our store
const store = createStore(fetchReducer, applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log("users: ", store.getState())})
store.dispatch(fetchUsers())