import { FC, ReactNode } from "react";
import styles from "./AppLayout.module.css"

import Navbar from "./Navbar/Navbar";
import { logedUser } from "../../consts/token";
import Logo from "../Logo/Logo";

interface AppLayoutProps {
    children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const logOut = () => {
        localStorage.clear()
    }

    return <div className={styles.layout}>
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <Navbar
                    username={logedUser}
                    avatar={"https://avatars.githubusercontent.com/u/71698995?u=56ef2b5ed7fa2cbbe8b08f2e2e1236ca0c96921a&v=4"}
                    logOut={logOut}
                />

            </div>
        </header>

        <main className={styles.main}>
            {children}

        </main>

    </div>
}

export default AppLayout