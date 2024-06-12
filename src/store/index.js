import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import postReducer from "./postReducer"
import thunk from "../middleware/thank";

const rootReduser = combineReducers({
	todo: postReducer,
});

const store  = createStore(rootReduser, applyMiddleware(thunk));

export default store