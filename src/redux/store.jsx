import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as userSlice } from "./slices/user/user.slice";
import {reducer as searchSlice } from "./slices/search/search.slice";



const reducersArray = combineReducers({
    userLogIn: userSlice,
    search: searchSlice,
})


export const store = configureStore({
    reducer: reducersArray
});


