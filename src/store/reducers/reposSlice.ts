import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IRepo } from "../../model/IRepo";
interface pageInfo {
    endCursor: string,
    startCursor:string,
}
interface ReposState {
    reposes: IRepo[],
    isLoading: boolean,
    error: string,
    pageInfo: pageInfo
    repositoryCount: number,
    currentReposInfo:IRepo
}
const initialState: ReposState = {
    reposes: [],
    isLoading: true,
    error: '',
    pageInfo: {} as pageInfo,
    repositoryCount: 0,
    currentReposInfo:{} as IRepo
}
export const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        reposFetching(state) {
            state.isLoading = true;
        },
        reposSuccess(state, action: PayloadAction<any>) {
            const { edges, pageInfo, repositoryCount } = action.payload
            state.isLoading = false;
            state.error = '';
            state.reposes = edges;
            state.pageInfo = pageInfo
            state.repositoryCount = repositoryCount
        },
        reposError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        currentReposFetch(state){
            state.isLoading = true;
        }, 
        currentReposSuccess(state,action:PayloadAction<IRepo>){
            const {repository}=action.payload
            state.isLoading = false;
            state.currentReposInfo=repository
        },
        currentReposError(state,action:PayloadAction<string>){
            state.isLoading = false;
            state.error =action.payload
        }
    }
})
export default reposSlice.reducer