// Especifica la BASE_URL para la API.
// export const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";
export const BASE_URL = "https://jerjesm.online/backend";

// La función de registro acepta los datos necesarios como argumentos,
// y envía una solicitud POST al endpoint dado.
export async function signup(password, email) {
  // console.log("== Signup ==");
  // console.log("password:" + password);
  // console.log("email: " + email);
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
  if (res.ok) return await res.json();
  throw new Error("Error al dar de alta el usuario");
}

// La función de autorización acepta los datos necesarios como parámetros.
export async function signin(email, password) {
  // Se envía una solicitud POST
  const res = await fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Los parámetros se envuelven en un objeto, convertido en un string
    // JSON y se envían en el cuerpo de la solicitud.
    body: JSON.stringify({ password, email }),
  });
  if (res.ok) return await res.json();
  throw new Error("Error al identificar usuario");
}

export async function getUserInfo(token) {
  // Se envía una solicitud POST
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) return await res.json();
  throw new Error("Error al buscar al usuario");
}

export async function validaToken(token) {
  // console.log("VALIDATOKEN Token: " + token);
  // Se envía una solicitud GET
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) return await res.json();
  throw new Error("Su sesión venció. Favor de iniciar sesión de nuevo");
}
