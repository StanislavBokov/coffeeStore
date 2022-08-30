const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const ISADMIN_KEY = "is-admin";

interface TokensData {
    refreshToken: string,
    accessToken: string,
    userId: string,
    expiresIn?: number
}
export function setIsAdmin(isAdmin: boolean) {
  localStorage.setItem(ISADMIN_KEY, isAdmin.toString());
}

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600
}: TokensData) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
}
export function removeAdminData() {
  localStorage.removeItem(ISADMIN_KEY);
}

export function getTokenExpiresDate() {
  return localStorage.getItem(EXPIRES_KEY);
}
export function getUserId() {
  return localStorage.getItem(USERID_KEY);
}
export function getRole() {
  return localStorage.getItem(ISADMIN_KEY);
}
const localStorageService = {
  setTokens,
  setIsAdmin,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  getRole,
  removeAuthData,
  removeAdminData
};
export default localStorageService;
