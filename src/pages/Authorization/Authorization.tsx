import { FC, useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Authorization.module.css"
import Logo from "../../components/Logo/Logo";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { authSlice } from "../../store/reducers/authSlice";
import { getUser } from "../../store/reducers/action-creators/auth";

const Authorization: FC = () => {
   const dispatch = useDispatch()
   const [_, setToken, getToken] = useLocalStorage('token', '')
   
   const login = (token: string) => {
      setToken(token)
      dispatch(authSlice.actions.setAuth(true))
      dispatch(authSlice.actions.setToken(token))
      dispatch(getUser())
   }
   useEffect(() => {
      const storedToken = getToken()
      if (storedToken) {
         dispatch(authSlice.actions.setAuth(true))
         dispatch(authSlice.actions.setToken(storedToken))
      }
   }, [])
   return <div className={styles.auth__wrapper}>
      <Logo />
      <p>Login with your</p>
      <p>Github Personal Access Token </p>
      <p>
      <a className={styles.link} href="https://github.com/settings/tokens" target="_blank">Token generate page</a>
      </p>
      <LoginForm onLogin={login} />
   </div>
}

export default Authorization