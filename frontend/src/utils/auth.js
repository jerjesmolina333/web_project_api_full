// Especifica la BASE_URL para la API.
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.jerjesm.online/";

// La función de registro acepta los datos necesarios como argumentos,
// y envía una solicitud POST al endpoint dado.
export async function signup(name, password, email, about, avatar) {
  try {
    const res = await fetch(`${BASE_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email, about, avatar }),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    throw new Error("Error al dar de alta el usuario");
  }
}

// La función de autorización acepta los datos necesarios como parámetros.
export async function signin(email, password) {
  try {
    const res = await fetch(`${BASE_URL}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Los parámetros se envuelven en un objeto, convertido en un string
      // JSON y se envían en el cuerpo de la solicitud.
      body: JSON.stringify({ password, email }),
    });
    if (res.ok) return await res.json();
  } catch (err) {
    throw new Error("Error al identificar usuario");
  }
}

export async function getUserInfo(token) {
  const res = await fetch(`${BASE_URL}users/me`, {
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
  try {
    const res = await fetch(`${BASE_URL}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) return await res.json();
    return await res.json();
  } catch (err) {
    throw new Error("Su sesión venció. Favor de iniciar sesión de nuevo");
  }
}
