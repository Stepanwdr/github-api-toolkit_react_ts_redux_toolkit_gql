import { FC, SyntheticEvent, useState } from "react";
import styles from "./LoginForm.module.css"

interface LoginFormProps {
    onLogin: (token: string) => void
}
const LoginForm: FC<LoginFormProps> = ({ onLogin }) => {
    const [tokenValue, setTokenValue] = useState('')
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if(tokenValue.trim()){
            onLogin(tokenValue);
        }
    };
    return (
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
                <div className={styles.input__container}>
                    <input
                        type="text"
                        value={tokenValue}
                        onChange={(e) => setTokenValue(e.target.value)}
                        placeholder="Paste your personal Access token"
                    />
                </div>
                <button className={styles.login__btn} type="submit">Login</button>
            </form>
        </div>
    );
};
export default LoginForm