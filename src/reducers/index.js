import React from "react";
import {combineReducers} from "redux";
import CasesReducer from "./CasesReducers";
import dropdownReducer from "./dropdown_reducer";
import stateReducer from "./stateReducer";
import worldReducer from "./worldReducer";

const allReducers =combineReducers({
    CasesReducer :CasesReducer,
    dropdownReducer:dropdownReducer,
    stateReducer:stateReducer,
    worldReducer:worldReducer
})
export default allReducers;
