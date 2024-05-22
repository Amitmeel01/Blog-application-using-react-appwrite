// all actions here means add post par kya action hoga etc
// states ko manage karne ka kaam hota hai yha

import { createSlice } from "@reduxjs/toolkit";

// initial state ko hi state bolte hai
const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        // action m payload hota hai
        login:(state,action)=>{
                state.status=true;
                state.userData=action.payload.userData;
        },

        logout:(state)=>{
            state.status=false;
            state.userData=null;
        },
    },
});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer