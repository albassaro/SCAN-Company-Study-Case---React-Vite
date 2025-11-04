import { createSlice } from "@reduxjs/toolkit";
import { getTokenAsync, getUserInfoAsync } from "./user.actions";

export const userSlice = createSlice({
    name: "LogIn",
    initialState: {
        isLoading: false,
        userIsOnline: false,
        userInfo: [],
        userSearchParams: [],
        formSubmitClicked: false,
        error: null,
    },
    reducers: {
        checkToken: (state) => {
            const tokenData = JSON.parse(localStorage.getItem("token"));
            if (tokenData) {
                const currentDate = new Date();
                const tokenDate = new Date(tokenData.expire);
                if ( tokenDate > currentDate) {
                    state.userIsOnline = true;
                    return
                } else {
                    state.userIsOnline = false;
                    return;
                }
            }
        },

        logOut: (state) => {
            localStorage.removeItem("token");
            state.userIsOnline = false;
        },
    },
        extraReducers: (builder) => {
        builder

        .addCase(getTokenAsync.pending, (state) => {
                state.formSubmitClicked = true;
        })

        .addCase(getTokenAsync.fulfilled, (state, action) => {
            if (action.payload.errorCode && action.payload.message) {
                state.formSubmitClicked = false;
                return;
            } else {
                state.userIsOnline = true;
                state.formSubmitClicked = false;
                localStorage.setItem("token", JSON.stringify(action.payload));
            }
      })
      .addCase(getTokenAsync.rejected, (state) => {
        state.error = true;
      })

      .addCase(getUserInfoAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserInfoAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      });
  },
});

export const { actions, reducer } = userSlice;
