import styles from "./Loader.module.scss";

export function Loader() {
    return (
        <div className={styles.ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
