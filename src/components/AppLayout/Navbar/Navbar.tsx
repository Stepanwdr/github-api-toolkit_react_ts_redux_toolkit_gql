import { FC } from "react"
import styles from "./Navbar.module.css"
import { useAppSelector } from "../../../hooks/redux"
import isEmpty from "../../../helpers/isEmpty"
import { useDispatch } from "react-redux"
import { authSlice } from "../../../store/reducers/authSlice"
import classnames from "classnames"


const Navbar: FC = () => {
  const dispatch=useDispatch()
  const { user } = useAppSelector(state => state.authSlice)
  const {logOut}=authSlice.actions
const logOutUser=()=>{
 dispatch(logOut())
}
  if (isEmpty(user)) {
    return null
  }
  return <nav className={styles.nav}>
    <ul className={styles.nav__list}>
      <li className={classnames(styles.nav__item,styles.user)}>
        <img src={user.avatarUrl} alt="avatar" />
        <span>{user.login}</span>
      </li>
      <li className={classnames(styles.login,styles.nav__item)}
        onClick={logOutUser}
      >
        <span>Logout</span>
      </li>
    </ul>
  </nav>
}
export default Navbar