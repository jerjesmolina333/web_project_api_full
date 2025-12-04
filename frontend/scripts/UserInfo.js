export class UserInfo {
  constructor(params) {
    this._userName = params.userName;
    this._userAbout = params.userAbout;
  }
  setUserInfo() {
    const nombrePerfil = document.querySelector(".profile__name");
    const profesionPerfil = document.querySelector(".profile__profession");
    nombrePerfil.textContent = this._userName;
    profesionPerfil.textContent = this._userAbout;
  }
  getUserInfo() {
    const userInfo = { name: this._userName, profession: this._userAbout };
    return userInfo;
  }
}
