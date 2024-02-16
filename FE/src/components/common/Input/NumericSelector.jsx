import { useState } from "react";
import { formatNumberDigit } from "../../../utils/number";
import styles from "./NumericSelector.module.scss";

export function NumericSelector({
    start,
    end,
    step,
    targetLength,
    padChar,
    unit,
    defaultValue = "00",
    onChange = (value) => {}
}) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const handleChange = ({ target: { value } }) => {
        setSelectedValue(value);
        onChange(value);
    };

    const optionLength = (end - start) / step + 1;
    const options = Array.from({ length: optionLength }, (_, index) => {
        const optionValue = start + index * step;
        const value = formatNumberDigit(optionValue, targetLength, padChar);
        return (
            <option key={value} value={value}>
                {value}
            </option>
        );
    });

    return (
        <>
            <select
                className={styles.select}
                value={selectedValue}
                onChange={handleChange}
            >
                {options}
            </select>
            <label className={styles.suffix}>{unit}</label>
        </>
    );
}
