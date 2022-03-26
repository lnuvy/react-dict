import { createStore, combineReducers } from "redux";
import word from "./modules/word";

const rootReducer = combineReducers({ word });

const store = createStore(rootReducer);

export default store;
