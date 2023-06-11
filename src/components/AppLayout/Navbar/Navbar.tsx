import { FC } from "react"
import styles from "./Navbar.module.css"
interface NavbarProps {
  username: string,
  avatar: string
  logOut:()=>void
}
const Navbar: FC<NavbarProps> = ({ username, avatar,logOut }) => {
  return <nav className={styles.nav}>
    <ul className={styles.nav__list}>
      <li className={`${styles.nav__item} ${styles.user}`}>
        <img src={avatar} alt="avatar" />
        <span>{username}</span>
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