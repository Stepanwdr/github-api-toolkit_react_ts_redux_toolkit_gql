import { FC, ReactNode } from "react";
import styles from "./AppLayout.module.css"
import Navbar from "./Navbar/Navbar";
import Logo from "../Logo/Logo";

interface AppLayoutProps {
    children: ReactNode
}
const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    return <div className={styles.layout}>
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <Navbar/>
            </div>
        </header>
        <main className={styles.main}>
            {children}
        </main>

    </div>
}

export default AppLayout