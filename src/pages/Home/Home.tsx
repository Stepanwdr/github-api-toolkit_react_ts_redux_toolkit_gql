import { FC } from "react";
import styles from './Home.module.css'
import RepoList from "../../components/RepoListContainer/RepoListContainer";

const Home: FC = () => {
    return <div className={styles.main}>
        <RepoList />
       
    </div>
}
export default Home