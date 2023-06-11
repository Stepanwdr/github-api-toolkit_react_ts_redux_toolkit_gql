import { ChangeEvent, FC, SyntheticEvent } from "react"
import styles from './RepoSearchInput.module.css'

interface RepoSearchInputProps {
    value: string
    onChange: (ev: ChangeEvent<HTMLInputElement>) => void
    onSubmit: (ev: SyntheticEvent) => void
    clearInput:()=>void
}

const RepoSearchInput: FC<RepoSearchInputProps> = ({ value, onChange, onSubmit,clearInput }) => {
    return <div className={styles.input__container}>

        <form onSubmit={onSubmit}>
            <input type="text"
                value={value}
                onChange={onChange}
                placeholder="Find a repository..."
            />
        </form>
        {value &&<button
         className={styles.clear__btn}
         onClick={clearInput}
         >X</button>}
    </div>
}
export default RepoSearchInput 