import "./App.css"
import { FC, useEffect } from "react"
import AppLayout from "./components/AppLayout/AppLayout"
import { useAppSelector } from "./hooks/redux"
import {  useNavigate } from "react-router-dom"
import { getUser } from "./store/reducers/action-creators/auth"
import isEmpty from "./helpers/isEmpty"
import { useDispatch } from "react-redux"
import AppRouter from "./pages"

const App: FC = () => {
    const { isAuth, user } = useAppSelector(state => state.authSlice)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isAuth) {
            dispatch(getUser())
        }
    }, [isAuth])

    useEffect(() => {
        if (!isEmpty(user)) {
            navigate(`/${user.login}`)
        }
    }, [isAuth, user])

    return (
        <AppLayout>
            <AppRouter />
        </AppLayout>
    )
}
export default App
