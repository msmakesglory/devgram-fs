// src/utils/authUtils.ts

export const getAuthToken = (): string | null => {
    const cookieName = "authToken=";
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        if (cookie.startsWith(cookieName)) {
            return cookie.substring(cookieName.length);
        }
    }
    return null;
};

export const clearAuthToken = (): void => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};