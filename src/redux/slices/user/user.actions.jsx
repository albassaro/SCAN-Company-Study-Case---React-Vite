import { createAsyncThunk} from "@reduxjs/toolkit";


export const getTokenAsync = createAsyncThunk(
    'LogIn/getTokenAsync',
    async(action, thunkAPI) =>{
        console.log("вошел в запрос")
        try{
                const responce = await fetch('https://gateway.scan-interfax.ru/api/v1/account/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    login: action.login,
                    password: action.password
                }),
            });
            const data = await responce.json();
            return data;
        }
        catch(error){
            console.log("error", error)
            thunkAPI.rejectWithValue(error.responce.data.message);
        }  
    }
)

export const getUserInfoAsync = createAsyncThunk(
    'LogIn/getUserInfoAsync',
    async(thunkAPI) =>{
        try{
                const responce = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).accessToken}`,
                },
            });
            const data = await responce.json();
            return data;
        }
        catch(error){
            console.log("error", error);
            thunkAPI.rejectWithValue(error);
        }  
    }
)
