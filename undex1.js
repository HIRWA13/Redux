// redux:
/**
 * how to get started:
 * - create an action instance
 * - create an action creator
 * - create an initial state
 * - create a reducer function
 * - create a store and pass into a reducer function
 * - subscribe using store and the subscribe method that takes in a function
 * - unsubscriibe using a function that is returned by the subscribe method
 */

/**
 * middleware: 
 *  -> adds custom functionalities to redux
 *  -> provides third party extension between dispatching an action and the moment it reaches the reducer
 */
const redux = require("redux")
const createStore = redux.createStore

const INCREMENT = "increment"
const DECREMENT = "decrement"

const initialState = {
  counter: 0
}

function incrementCounter () {
  return {
    type: INCREMENT,
    info: "incrementing a counter"
  }
}

function decrementCounter () {
  return {
    type: DECREMENT,
    info: "decrementing a counter"
  }
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT: {
      return {
        ...state,
        counter: state.counter + 1
      }
    }
    case DECREMENT: {
      return {
        ...state, 
        counter: state.counter - 1
      }
    }
    default: return state
  } 
}

const store = createStore(counterReducer)
console.log(store.getState())

store.subscribe(() => console.log("in store now: ", store.getState()))

store.dispatch(incrementCounter())
store.dispatch(incrementCounter())
store.dispatch(incrementCounter())
store.dispatch(incrementCounter())


store.dispatch(decrementCounter())
store.dispatch(decrementCounter())
store.dispatch(decrementCounter())
store.dispatch(decrementCounter())