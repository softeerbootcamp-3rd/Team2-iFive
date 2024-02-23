import styles from "./LabelledList.module.scss";

/**
 * @param {Object} props
 * @param {string} props.articleStyle - article의 CSS 클래스
 * @param {string} props.label
 * @param {React.ReactNode} props.children - 리스트 내에 표시될 자식 요소
 */
export function LabelledList({ articleStyle, label, children }) {
    return (
        <article className={styles[articleStyle]}>
            <label>{label}</label>
            <ul>{children}</ul>
        </article>
    );
}
