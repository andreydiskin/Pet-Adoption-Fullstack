const TOKEN = "Token";

export const storeLogin = (token) => localStorage.setItem(TOKEN, token);
export const storeLogout = () => localStorage.removeItem(TOKEN);
export const storeGetToken = () => localStorage.getItem(TOKEN);

export const storeIsLoggedIn = () => {
  return storeGetToken() ? true : false;
};
