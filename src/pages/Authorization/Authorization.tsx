import { FC, useEffect } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Authorization.module.css"
import Logo from "../../components/Logo/Logo";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch } from "react-redux";
import { authSlice } from "../../store/reducers/authSlice";
import { getUser } from "../../store/reducers/action-creators/auth";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const Authorization: FC = () => {
   const navigate = useNavigate()
   const [_, setToken, getToken] = useLocalStorage('token', '')

   const { user } = useAppSelector(state => state.authSlice)
   const login = (token: string) => {
      setToken(token)
      dispatch(authSlice.actions.setToken(token))
      dispatch(getUser())
      navigate(`/${user.login}`)
   }
   const dispatch = useDispatch()
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
      <p>Github Personal Access Token or use This</p>
      <LoginForm onLogin={login} />
   </div>
}

export default Authorization