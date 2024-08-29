import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value:{},
    isLogin : false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLoginRedux: (state,action) => {
            state.value = action.payload

            if(action.payload.token){
                state.isLogin = true
            }
        }
    }
})

export const {userLoginRedux} = authSlice.actions
export default authSlice.reducer