import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import reposSlice from "./reducers/reposSlice"
import authSlice from "./reducers/authSlice"


const rootReducer=combineReducers({
    reposSlice,
    authSlice
   })
export const setupStore=()=>{
    return configureStore({
        reducer:rootReducer,
        middleware:()=>
        getDefaultMiddleware().concat()
    })
}

export type RootState=ReturnType<typeof rootReducer>
export type AppStore=ReturnType<typeof setupStore>
export type AppDispatch=AppStore['dispatch']