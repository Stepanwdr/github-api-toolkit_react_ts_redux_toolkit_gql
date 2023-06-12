import { FC, useEffect } from "react";
import styles from './RepoPage.module.css'
import RepoInfo from "../../components/RepoInfo/RepoInfo";
import { useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";
import { getReposInfo } from "../../store/reducers/action-creators/repos";
import AppLayout from "../../components/AppLayout/AppLayout";

const RepoPage: FC = () => {
      const { repoOwner, repoName } = useParams()
      const dispatch = useDispatch()
      const { currentReposInfo } = useAppSelector(state => state.reposSlice)
      useEffect(() => {
            if (repoOwner && repoName) {
                  dispatch(getReposInfo(repoOwner, repoName))
            }
      }, [repoName])

      return <AppLayout>
            <RepoInfo repo={currentReposInfo} />
      </AppLayout>
}
export default RepoPage