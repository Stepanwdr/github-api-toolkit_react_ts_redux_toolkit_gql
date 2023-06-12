import { FC } from "react"
import styles from "./Navbar.module.css"
import { useAppSelector } from "../../../hooks/redux"
import isEmpty from "../../../helpers/isEmpty"

const Navbar: FC = () => {
  const { user } = useAppSelector(state => state.authSlice)
  
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
        onClick={() => console.log("log")}
      >
        <span>Logout</span>
      </li>
    </ul>
  </nav>
}
export default Navbar