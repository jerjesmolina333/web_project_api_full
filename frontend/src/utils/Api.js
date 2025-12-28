export class Api {
  constructor({ linkUser, linkImags }, headers) {
    this._linkUs = linkUser || import.meta.env.VITE_API_USER_URL;
    this._linkImags = linkImags || import.meta.env.VITE_API_CARDS_URL;
    this._headers = headers;
  }

  getInfoUser() {
    // console.log(">>>>Api.getInfoUser: Fetching user info from", this._linkUs);
    // console.log(">>>>Api.getInfoUser: Headers:", this._headers);
    return fetch(this._linkUs, this._headers)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }

  getImagesList() {
    return fetch(this._linkImags, this._headers)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }

  setCardLike(id) {
    const tempURL = `${this._linkImags}${id}/likes`;

    return fetch(tempURL, {
      method: "PUT",
      ...this._headers,
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }

  setCardNoLike(id) {
    const tempURL = `${this._linkImags}${id}/likes`;

    return fetch(tempURL, {
      method: "DELETE",
      ...this._headers,
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }

  handleCardDelete(id) {
    const tempURL = `${this._linkImags}${id}`;

    return fetch(tempURL, {
      method: "DELETE",
      ...this._headers,
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }

  _actualizaUsuario(data) {
    const tempURL = `${this._linkUs}`;
    console.log(">>>>Api.actualizaUsuario: Updating user info at", tempURL);
    console.log(">>>>Api.actualizaUsuario: Data:", data);
    console.log(">>>>Api.actualizaUsuario: this._headers:", this._headers);
    console.log(">>>>Api.actualizaUsuario: tempURL:", tempURL);
    console.log(
      ">>>>Api.actualizaUsuario: this._headers.headers:",
      this._headers.headers
    );

    const jsonParam = JSON.stringify({
      name: data.name,
      about: data.about,
    });

    const objParams = {
      method: "PATCH",
      headers: {
        ...this._headers.headers,
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };

    console.log(">>>>Api.actualizaUsuario: objParams:", objParams);
    console.log(
      ">>>>Api.actualizaUsuario: objParams.headers:",
      objParams.headers
    );

    return fetch(tempURL, objParams)
      .then(function (res) {
        console.log(">>>>Api.actualizaUsuario: Response status:", res.status);
        if (!res.ok) {
          return res.text().then((text) => {
            console.error(">>>>Api.actualizaUsuario: Error response:", text);
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then(function (result) {
        console.log(">>>>Api.actualizaUsuario: Response data:", result);
        return result;
      })
      .catch(function (error) {
        console.error(">>>>Api.actualizaUsuario: Error:", error);
        return Promise.reject(`Error: ${error}`);
      });
  }

  insertaImagen(data) {
    const tempURL = `${this._linkImags}`;
    const jsonParam = JSON.stringify({
      name: data.name,
      link: data.link,
    });
    const objParams = {
      method: "POST",
      headers: {
        ...this._headers.headers,
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };
    return fetch(tempURL, objParams)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }

  _actualizaAvatar(data) {
    const tempURL = `${this._linkUs}/avatar`;
    console.log(">>>>Api.actualizaAvatar: URL:", tempURL);
    console.log(">>>>Api.actualizaAvatar: Headers:", this._headers.headers);

    const jsonParam = JSON.stringify({
      avatar: data.avatar,
    });

    const objParams = {
      method: "PATCH",
      headers: {
        ...this._headers.headers,
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };

    return fetch(tempURL, objParams)
      .then(function (res) {
        console.log(">>>>Api.actualizaAvatar: Response status:", res.status);
        if (!res.ok) {
          return res.text().then((text) => {
            console.error(">>>>Api.actualizaAvatar: Error response:", text);
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then(function (result) {
        console.log(">>>>Api.actualizaAvatar: Response data:", result);
        return result;
      })
      .catch(function (error) {
        console.error(">>>>Api.actualizaAvatar: Error:", error);
        return Promise.reject(`Error: ${error}`);
      });
  }
}

export default Api;
