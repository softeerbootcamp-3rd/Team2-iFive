export function getSessionStorage(key) {
    return sessionStorage.getItem(key);
}

export function setSessionStorage(key, token) {
    sessionStorage.setItem(key, token);
}
