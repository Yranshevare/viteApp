import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    status: false,      //is there any user 
    userData: null      //data of that user if ih exist
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true;
            state.userData = action.payload.userData
        },
        logout:(state)=>{       //as we do not need any parameter while logout we don't need action  
            state.status = false
            state.userData = null
        }
    }
})

export const {login,logout} = authSlice.actions

export default authSlice.reducer