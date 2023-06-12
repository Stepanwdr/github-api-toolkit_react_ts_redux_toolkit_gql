import { ISearch } from "../../../model/ISearch"
import { reposServices } from "../../../services/reposServices"
import { AppDispatch } from "../../store"
import { reposSlice } from "../reposSlice"


export const searchRepos=(searchData:ISearch):any=>{
    return async(dispatch:AppDispatch)=>{
      try{
        dispatch(reposSlice.actions.reposFetching())
        const res=await reposServices.fetchSearchRepos(searchData)
        dispatch(reposSlice.actions.reposSuccess(res.search))
      }catch(e:any){
        dispatch(reposSlice.actions.reposError(e.message))
      }
    }
  }
  
  export const getReposInfo=(owner:string,repoName:string):any=>{
   return async (dispatch:AppDispatch):Promise<any>=>{
     try{
      dispatch(reposSlice.actions.currentReposFetch())
      const res= await reposServices.fetchReposInfo(owner,repoName)
        dispatch(reposSlice.actions.currentReposSuccess(res))
     }catch(e:any){
      dispatch(reposSlice.actions.currentReposError(e.message))
     }
   }
  }