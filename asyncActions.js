const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const thunkMiddleware = require('redux-thunk').default

// start by defining an initial state

const initialState = {
    loading: false,
    users: [],
    error: ''
}

// create actions 

const FETCH_USER_REQUEST =  'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_ERROR = 'FETCH_USER_ERROR'

// create action creators

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserSuccess = (users) => {
    return {
      type: FETCH_USER_SUCCESS,
      payload: users
    };
}

const fetchUserError = (error) => {
    return {
        type: FETCH_USER_ERROR,
        payload: error
    }
}

const fetchReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_USER_REQUEST:
            return {
                ...state,
                loading: true
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
    }
}

// create a store

const store = createStore(fetchReducer, applyMiddleware(thunkMiddleware))