/**
 *
 * @param {number} value 변환할 숫자
 * @param {number} targetLength 목표 자릿수
 * @param {string} padChar 채울 문자
 * @return {string} 변환된 문자열
 */
export function formatNumberDigit(value, targetLength, padChar) {
    return value.toString().padStart(targetLength, padChar);
}
