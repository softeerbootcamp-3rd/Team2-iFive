import styles from "./Complete.module.scss";
import { Footer } from "../Footer/Footer";

function Container({ header, imgSrc, date, text }) {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <h1>{header}</h1>
                <span>{date}</span>
            </div>
            <img src={imgSrc} alt="icon"></img>
            <span>{text}</span>
        </div>
    );
}

export function CompleteComponent(props) {
    return (
        <div className={styles.wrapper}>
            <Container {...props}></Container>
            <Footer text={"확인"}></Footer>
        </div>
    );
}
