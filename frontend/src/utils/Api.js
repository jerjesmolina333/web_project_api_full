let datosUs;
const initialImages = [];

export class Api {
  constructor({ linkUser, linkImags }, headers) {
    this._linkUs = linkUser;
    this._linkImags = linkImags;
    this._headers = headers;
  }

  getInfoUser() {
    // return fetch(this._linkUs, this._headers)
    return fetch(this._linkUs)
      .then(function (res) {
        return res.json();
      })

      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${error}`);
      });
  }

  getImagesList() {
    // return fetch(this._linkImags, this._headers)
    return fetch(this._linkImags)
      .then(function (res) {
        return res.json();
      })

      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${error}`);
      });
  }
  setCardLike(id) {
    // const tempURL = `https://around-api.es.tripleten-services.com/v1/cards/${id}/likes`;
    const tempURL = `https://jerjesm.online/cards/${id}/likes`;

    return fetch(tempURL, {
      method: "PUT",
      // headers: {
      //   authorization: "a75089ec-acc5-4d18-8c11-de5f96ae144f",
      // },
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${res.status}`);
      });
  }
  setCardNoLike(id) {
    // const tempURL = `https://around-api.es.tripleten-services.com/v1/cards/${id}/likes`;
    const tempURL = `https://jerjesm.online/cards/${id}/likes`;

    return fetch(tempURL, {
      method: "DELETE",
      // headers: {
      //   authorization: "a75089ec-acc5-4d18-8c11-de5f96ae144f",
      // },
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${res.status}`);
      });
  }

  handleCardDelete(id) {
    // const tempURL = `https://around-api.es.tripleten-services.com/v1/cards/${id}`;
    const tempURL = `https://jerjesm.online/cards/${id}`;

    return fetch(tempURL, {
      method: "DELETE",
      // headers: {
      //   authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
      // },
    })
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${res.status}`);
      });
  }
  _actualizaUsuario(data) {
    // const tempURL = "https://around-api.es.tripleten-services.com/v1/users/me";
    const tempURL = "https://jerjesm.online/users/me";
    const jsonParam = JSON.stringify({
      name: data.name,
      about: data.about,
    });
    const objParams = {
      method: "PATCH",
      // headers: {
      //   authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
      //   "Content-Type": "application/json",
      // },
      body: jsonParam,
    };
    return fetch(tempURL, objParams)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${error}`);
      });
  }

  insertaImagen(data) {
    // const tempURL = "https://around-api.es.tripleten-services.com/v1/cards/";
    const tempURL = "https://jerjesm.online/cards/";
    const jsonParam = JSON.stringify({
      name: data.name,
      link: data.link,
    });
    const objParams = {
      method: "POST",
      headers: {
        // authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };
    return fetch(tempURL, objParams)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${error}`);
      });
  }
  _actualizaAvatar(data) {
    const tempURL =
      // "https://around-api.es.tripleten-services.com/v1/users/me/avatar";
      "https://jerjesm.online/users/me/avatar";
    const jsonParam = JSON.stringify({
      avatar: data.avatar,
    });
    const objParams = {
      method: "PATCH",
      headers: {
        // authorization: "082ad1cf-6751-4277-bd54-4a8ddfdec0e7",
        "Content-Type": "application/json",
      },
      body: jsonParam,
    };
    return fetch(tempURL, objParams)
      .then(function (res) {
        return res.json();
      })
      .catch(function (error) {
        console.log(error);
        return Promise.reject(`Error: ${error}`);
      });
  }
}

export default Api;
