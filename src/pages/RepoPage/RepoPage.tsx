import { FC, useEffect } from "react";
import styles from './RepoPage.module.css'
import RepoInfo from "../../components/RepoInfo/RepoInfo";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { getReposInfo } from "../../store/reducers/action-creators/repos";

const RepoPage: FC = () => {
      const { repoOwner, repoName } = useParams()
      const dispatch = useDispatch()
      const { currentReposInfo, isLoading, error } = useAppSelector(state => state.reposSlice)
      useEffect(() => {
            if (repoOwner && repoName) {
                  dispatch(getReposInfo(repoOwner, repoName))
            }
      }, [repoName])
      if (isLoading) return <>Loading...</>
      if (error) return <>Error...{error}</>
      return <RepoInfo repo={currentReposInfo} />

}
export default RepoPage