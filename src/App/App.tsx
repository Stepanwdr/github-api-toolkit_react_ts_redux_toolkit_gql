import { useNavigate } from "react-router-dom"
import "./App.css"
import { FC, useEffect } from "react"
import { useAppSelector } from "../hooks/redux"
import { useDispatch } from "react-redux"
import { getUser } from "../store/reducers/action-creators/auth"
import isEmpty from "../helpers/isEmpty"
import AppLayout from "../components/AppLayout/AppLayout"
import AppRouter from "../pages"


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
            navigate(`/`)
        }
    }, [isAuth, user])

    return (
        <AppLayout>
            <AppRouter />
        </AppLayout>
    )
}
export default App
