const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE"; // action name

// create an action creator -> function that returns an action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first Redux action",
  };
}

const initialState = {
    numberOfCakes: 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case BUY_CAKE: {
            return {
                ...state,  // make a copy of the state object in case it con
                numberOfCakes: state.numberOfCakes - 1
            }
        }
        default: return state;
    }
}


const store = createStore(reducer)

console.log("state", store.getState())
const unsubscribe = store.subscribe(() => console.log("subscribed. updated state: ", store.getState()));

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

unsubscribe();

store.dispatch(buyCake());