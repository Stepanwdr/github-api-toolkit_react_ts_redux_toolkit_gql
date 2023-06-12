import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../types/IUser";

export interface AuthState {
    isAuth:boolean,
    token:string,
    user:IUser
}
const initialState: AuthState = {
    isAuth:false,
    token:"",
    user:{} as IUser
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state,action:PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setToken(state,action:PayloadAction<string>){
            state.token=action.payload
        },
        setUser(state,action:PayloadAction<IUser>){
            state.user=action.payload
        }
    }
})
export default authSlice.reducer