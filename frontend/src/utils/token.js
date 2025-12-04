const TOKEN_KEY = "jwt";

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

// setToken acepta el token como argumento y lo agrega a
// localStorage con la clave TOKEN_KEY.
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

// getToken recupera y devuelve el valor asociado a
// TOKEN_KEY desde localStorage.
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
