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

    const { authenticateUser } = parseJwt(token);
    const role = JSON.parse(authenticateUser).role;
    return role;
}

function parseJwt(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );

    return JSON.parse(jsonPayload);
}
