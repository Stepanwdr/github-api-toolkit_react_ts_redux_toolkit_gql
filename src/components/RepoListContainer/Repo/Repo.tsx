import { FC } from "react";
import styles from './Repo.module.css'
import { Link } from "react-router-dom";
import formatDate from "../../../helpers/formatDate";
const Item: FC<any> = ({ repo }) => {
    return <li className={styles.repo__container} key={repo.name}>
        <div className={styles.name}>
            <Link className={styles.link} to={`${repo.name}`}>{repo.name}</Link>
        </div>
        <div className={styles.last__update}>
            <span className={styles.label}>
                Updated
            </span>
            {formatDate(repo.pushedAt)}
        </div>
        <div className={styles.github__link}>
            <a href={repo.url} target="_blank">{repo.url}</a>
        </div>
        <div className={styles.stars}>
             <span className={styles.label}>★</span>
             <span>{repo.stargazerCount}</span>
        </div>
    </li>
}
export default Item