// Especifica la BASE_URL para la API.
export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.jerjesm.online/";

// La función de registro acepta los datos necesarios como argumentos,
// y envía una solicitud POST al endpoint dado.
export async function signup(name, password, email, about, avatar) {
  try {
    console.log("🔵 Signup - URL:", `${BASE_URL}signup`);
    console.log("🔵 Signup - Data:", { name, email, about, avatar });

    const res = await fetch(`${BASE_URL}signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email, about, avatar }),
    });

    console.log("🔵 Signup - Response status:", res.status);

    if (res.ok) {
      const data = await res.json();
      console.log("✅ Signup - Success:", data);
      return data;
    } else {
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      console.error("❌ Signup - Error:", res.status, errorData);
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      );
    }
  } catch (err) {
    console.error("❌ Signup - Exception:", err);
    throw new Error(err.message || "Error al dar de alta el usuario");
  }
}

// La función de autorización acepta los datos necesarios como parámetros.
export async function signin(email, password) {
  try {
    console.log("🔵 Signin - URL:", `${BASE_URL}signin`);
    console.log("🔵 Signin - Email:", email);

    const res = await fetch(`${BASE_URL}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    });

    console.log("🔵 Signin - Response status:", res.status);

    if (res.ok) {
      const data = await res.json();
      console.log("✅ Signin - Success:", data);
      return data;
    } else {
      const errorData = await res
        .json()
        .catch(() => ({ message: res.statusText }));
      console.error("❌ Signin - Error:", res.status, errorData);
      throw new Error(
        errorData.message || `Error ${res.status}: ${res.statusText}`
      );
    }
  } catch (err) {
    console.error("❌ Signin - Exception:", err);
    throw new Error(err.message || "Error al identificar usuario");
  }
}

export async function getUserInfo(token) {
  console.log("🔵 getUserInfo - URL:", `${BASE_URL}users/me`);
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
