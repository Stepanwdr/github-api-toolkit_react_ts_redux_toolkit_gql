import { FC } from "react"
import styles from "./Navbar.module.css"
import { useAppSelector } from "../../../hooks/redux"
import isEmpty from "../../../helpers/isEmpty"
import { authSlice } from "../../../store/reducers/authSlice"
import { useDispatch } from "react-redux"


const Navbar: FC = () => {
  const dispatch=useDispatch()
  const { user } = useAppSelector(state => state.authSlice)
const logOutUser=()=>{
  console.log("1212")
 dispatch(authSlice.actions.logOut())
 localStorage.clear()
}
  if (isEmpty(user)) {
    return null
  }
  return <nav className={styles.nav}>
    <ul className={styles.nav__list}>
      <li className={`${styles.nav__item} ${styles.user}`}>
        <img src={user.avatarUrl} alt="avatar" />
        <span>{user.login}</span>
      </li>
      <li className={`${styles.login} ${styles.nav__item}`}
        onClick={logOutUser}
      >
        <span>Logout</span>
      </li>
    </ul>
  </nav>
}
export default Navbar