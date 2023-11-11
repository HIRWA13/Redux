const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

const BUY_CAKE = "BUY_CAKE"; // action name
const BUY_ICECREAM = "BUY_ICECREAM"; // action name

// create an action creator -> function that returns an action
function buyCake() {
  return {
    type: BUY_CAKE,
    info: "first Redux action",
  };
}

function buyIcream() {
    return {
        type: BUY_ICECREAM,
        info: "second Redux action",
    }
}

const initialCakesState = {
    numberOfCakes: 10
}

const initialIcreamState = {
    numberOfIcreams: 20
}

const cakesReducer = (state = initialCakesState, action) => {
    switch(action.type) {
        case BUY_CAKE: {
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        }
        default: return state
    }
}

const iceCreamReducer = (state = initialIcreamState , action) => {
    switch (action.type) {
        case BUY_ICECREAM: {
            return {
                ...state,
                numberOfIcreams: state.numberOfIcreams - 1
            }
        }
        default: return state
    }
}

const rootReducer = combineReducers({
    cake: cakesReducer,
    icecream: iceCreamReducer
})

const store = createStore(rootReducer)

console.log("state", store.getState())
const unsubscribe = store.subscribe(() => console.log("subscribed. updated state: ", store.getState()));

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIcream())
store.dispatch(buyIcream())
store.dispatch(buyIcream())
store.dispatch(buyIcream())

unsubscribe();
