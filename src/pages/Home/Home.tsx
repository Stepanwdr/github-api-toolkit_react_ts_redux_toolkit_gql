import { FC } from "react";
import RepoList from "../../components/RepoListContainer/RepoListContainer";
import AppLayout from "../../components/AppLayout/AppLayout";

const Home: FC = () => {
    return <AppLayout>
        <RepoList />
    </AppLayout>
}
export default Home