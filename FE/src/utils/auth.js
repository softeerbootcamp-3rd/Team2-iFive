export function getAccessToken() {
    return localStorage.getItem("accessToken");
}
export function getRefreshToken() {
    return localStorage.getItem("refreshToken");
}

export function checkAuthLoader() {
    const token = getAccessToken();

    if (!token) {
        return redirect("/login");
    }
}
