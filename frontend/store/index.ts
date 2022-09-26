import { createStore, combineReducers, applyMiddleware } from "redux";
import { userReducer, socketReducer } from "./reducer";
import thunk from "redux-thunk";

const rootReduceer = combineReducers({
    user: userReducer,
    client: socketReducer
})

const store = applyMiddleware(thunk)(createStore)(rootReduceer);

export default store;