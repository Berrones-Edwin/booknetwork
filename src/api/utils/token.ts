export function getToken() {
    return localStorage.getItem("token")
}

export function removeAuthToken() {
    localStorage.removeItem("token")
}