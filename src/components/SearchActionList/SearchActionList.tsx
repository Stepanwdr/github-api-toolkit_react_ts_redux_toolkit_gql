import { FC, SyntheticEvent } from "react";
import styles from './SearchActionList.module.css'

interface SearchActionListProps {
    searchValue?: string,
    search: (ev: SyntheticEvent) => void

}
const SearchActionList: FC<SearchActionListProps> = ({ searchValue, search }) => {
    return <div className={styles.list_container}>
        <div className={styles.search__all}>
            <button
                onClick={search}
                className={styles.search__value__btn}
            >
                {searchValue}
                <span>Search All Of Github</span>
            </button>

        </div>
        <ul className={styles.list}>

        </ul>
    </div>
}
export default SearchActionList