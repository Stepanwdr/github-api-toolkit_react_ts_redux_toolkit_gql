import { FC, useEffect } from "react";
import styles from './RepoPage.module.css'
import RepoInfo from "../../components/RepoInfo/RepoInfo";
import { useParams } from "react-router-dom";
import { getReposInfo } from "../../store/reducers/ActionCreators";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/redux";

const RepoPage: FC = () => {
      const { repoOwner, repoName } = useParams()
      const dispatch = useDispatch()
      const { currentReposInfo } = useAppSelector(state => state.reposSlice)
      useEffect(() => {
            if (repoOwner && repoName) {
                  dispatch(getReposInfo(repoOwner, repoName))
            }
      }, [repoOwner])

      return <div className={styles.main}>
            <RepoInfo repo={currentReposInfo} />
      </div>
}
export default RepoPage