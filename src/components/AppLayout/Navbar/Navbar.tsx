import { FC } from "react"
import styles from "./Navbar.module.css"
import { IUser } from "../../../types/IUser"
interface NavbarProps {
  user:IUser
  logOut:()=>void
}
const Navbar: FC<NavbarProps> = ({ user,logOut }) => {
  return <nav className={styles.nav}>
    <ul className={styles.nav__list}>
      <li className={`${styles.nav__item} ${styles.user}`}>
        <img src={user.avatarUrl} alt="avatar" />
        <span>{user.login}</span>
      </li>
      <li className={`${styles.login} ${styles.nav__item}`}
      onClick={logOut}
      >
          <span>Logout</span>
      </li>
    </ul>
  </nav>
}
export default Navbar