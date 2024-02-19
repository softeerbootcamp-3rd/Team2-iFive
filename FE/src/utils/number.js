/**
 *
 * @param {number} value 변환할 숫자
 * @param {number} targetLength 목표 자릿수
 * @param {string} padChar 채울 문자
 * @return {Number} 변환된 숫자
 */
export function formatNumberDigit(value, targetLength, padChar) {
    return Number(value.toString().padStart(targetLength, padChar));
}
