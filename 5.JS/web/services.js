export function getLocalStorage(key) {
    if (!key) return null;
    const value = localStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
}

export function setLocalStorage(key, value) {
    if (!key || !value) return;
    const dataString = JSON.stringify(value);
    localStorage.setItem(key, dataString);
}
