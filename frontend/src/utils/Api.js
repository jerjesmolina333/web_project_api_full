export class Api {
  constructor({ linkUser, linkImags }, headers) {
    this._linkUs = linkUser || import.meta.env.VITE_API_USER_URL;
    this._linkImags = linkImags || import.meta.env.VITE_API_CARDS_URL;
    this._headers = headers;
  }

  getInfoUser() {
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


    return fetch(tempURL, objParams)
      .then(function (res) {
        if (!res.ok) {
          return res.text().then((text) => {
            console.error(">>>>Api.actualizaUsuario: Error response:", text);
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then(function (result) {
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
        if (!res.ok) {
          return res.text().then((text) => {
            console.error(">>>>Api.actualizaAvatar: Error response:", text);
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then(function (result) {
        return result;
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }
}

export default Api;
