import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import reposSlice from "./reducers/reposSlice"


const rootReducer=combineReducers({
    reposSlice
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