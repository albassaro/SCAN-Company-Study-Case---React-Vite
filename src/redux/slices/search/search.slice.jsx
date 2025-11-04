import {createSlice } from "@reduxjs/toolkit";
import { getDocumentsSearchAsync, getSearchHystagramAsync } from "./search.actions";
import { getSearchObjectsAsync } from "./search.actions"

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isLoading: false,
        userSearchObjects: [],
        formSubmitClicked: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder =>{
        builder
        .addCase(getSearchHystagramAsync.pending, (state)=>{
            state.formSubmitClicked = true;
        })
        .addCase(getSearchHystagramAsync.fulfilled, (state,action)=>{
            if(action.payload.errorCode && action.payload.message){
                state.formSubmitClicked = false;
            }else {
                state.formSubmitClicked = false;
                
                localStorage.setItem("hystogramData",JSON.stringify(action.payload.data))
                localStorage.setItem("formData",JSON.stringify(action.meta.arg))
                
            }            
        })
        .addCase(getSearchHystagramAsync.rejected, (state)=>{
            state.formSubmitClicked = false;
            state.error = true;
        })

        .addCase(getSearchObjectsAsync.pending, (state)=>{
                state.isLoading = true;
        })
        
        .addCase(getSearchObjectsAsync.fulfilled, (state,action)=>{
            if(action.payload.errorCode && action.payload.message){
                state.isLoading = false;
            }else {
                state.userSearchObjects = action.payload.items
                state.isLoading = false;
            }            
        })
        .addCase(getSearchObjectsAsync.rejected, (state)=>{
            state.error = true;
        })

        .addCase(getDocumentsSearchAsync.rejected, (state)=>{
            state.error = true;
        })

    }
})

export const {actions, reducer} = searchSlice;