import { FC } from "react"
import avatarImg from "../../assets/images/avatar.png"
import styles from './RepoInfo.module.css'
import { Link } from "react-router-dom"
import formatDate from "../../helpers/formatDate"
interface RepoInfoProps {
    repo: any
}
const RepoInfo: FC<RepoInfoProps> = ({ repo }) => {
    const {
        name,
        pushedAt,
        owner,
        languages,
        stargazerCount,
        description
    } = repo

    return <div className={styles.info__container}>
        <Link to={`/${owner?.login}`} className={styles.back__btn}>← back</Link>
        <div className={styles.info__top}>
            <h3 className={styles.repo__name}>{name}</h3>
            <span className={styles.title}>
                ★
            </span>
            {stargazerCount} star
        </div>
        <div className={styles.about}>
            <p className={styles.title}>Owner</p>
            <div className={styles.owner}>
                <img src={owner?.avatarUrl? owner?.avatarUrl:avatarImg}
                    alt="avatar"
                    className={styles.owner__avatar}
                />
                <div>
                    <p className={styles.label}>Owner</p>
                    <a href={owner?.url}
                        className={styles.owner__link}
                        target="_blank"
                    >
                        {owner?.login}
                    </a>
                </div>

            </div>
            {description ? <div>
                <p className={styles.title}>
                    Description
                </p>
                {description}
            </div> : ''}

            <div>
                <p className={styles.title}>
                    Updated
                </p>
                <div>
                    {formatDate(pushedAt)}
                </div>
            </div>
            <div className={styles.languages}>
                <p className={styles.title}>
                    Languages
                </p>
                {languages?.nodes.map((lng: any) => (
                    <span key={lng.name}>{lng.name}</span>
                ))}
            </div>
        </div>

    </div>
}

export default RepoInfo