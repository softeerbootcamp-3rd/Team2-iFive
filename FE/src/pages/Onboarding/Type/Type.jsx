import { Link } from "react-router-dom";
import styles from "./Type.module.scss";

/**
 *
 * @param {string} type
 * @param {string} img
 * @param {string} url
 * @returns
 */
export function Type({ type, img, url }) {
    return (
        <article className={styles.type}>
            <Link className={styles.typeLink} to={url}>
                <img src={img} alt="truck" className={styles.typeImg} />
            </Link>
            <h1 className={styles.typeText}>{type}</h1>
        </article>
    );
}
