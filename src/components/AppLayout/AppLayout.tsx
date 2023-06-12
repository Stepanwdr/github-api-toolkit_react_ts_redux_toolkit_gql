import { FC, ReactNode, useEffect } from "react";
import styles from "./AppLayout.module.css"
import Navbar from "./Navbar/Navbar";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authSlice } from "../../store/reducers/authSlice";
import { useAppSelector } from "../../hooks/redux";
import { getUser } from "../../store/reducers/action-creators/auth";
import { IUser } from "../../types/IUser";
import isEmpty from "../../helpers/isEmpty";

interface AppLayoutProps {
    children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
    const { isAuth,user } = useAppSelector(state => state.authSlice)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logOut = () => {
        dispatch(authSlice.actions.setAuth(false))
        dispatch(authSlice.actions.setUser({} as IUser))
        navigate("/")
        localStorage.clear()
    }
    useEffect(() => {
        if(isAuth){
            dispatch( getUser())
        }
    }, [isAuth])

    useEffect(() => {
        if(!isEmpty(user)){
            navigate(`/${user.login}`)
        }
        console.log(user)
    }, [isAuth,user])

    return <div className={styles.layout}>
        <header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <Navbar
                     user={user}
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