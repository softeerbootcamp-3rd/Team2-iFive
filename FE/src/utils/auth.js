export function getAccessToken() {
    return localStorage.getItem("accessToken");
}
export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

export function setToken(key, token) {
    localStorage.setItem(key, token);
}

export function checkAuthLoader() {
    const token = getAccessToken();

    if (!token) {
        return redirect("/login");
    }
}
