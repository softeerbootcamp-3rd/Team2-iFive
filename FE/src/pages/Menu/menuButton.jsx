import styles from "./menuButton.module.scss";

export function MenuButton({ imgUrl, text }) {
    return (
        <div className={styles.wrapper}>
            <img src={imgUrl}></img>
            <span>{text}</span>
        </div>
    );
}
