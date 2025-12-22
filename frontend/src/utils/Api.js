const initialImages = [];

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
    console.log(
      ">>>>Api.getImagesList: Fetching images list from",
      this._linkImags
    );
    console.log(">>>>Api.getImagesList: Headers:", this._headers);

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
        return res.json();
      })
      .catch(function (error) {
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
        return res.json();
      })
      .catch(function (error) {
        return Promise.reject(`Error: ${error}`);
      });
  }
}

export default Api;
