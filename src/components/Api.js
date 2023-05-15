export default class Api {
  constructor(apiToken, apiUrl, apiCogortId) {
    this._apiToken = apiToken;
    this._apiUrl = apiUrl;
    this._apiCogortId = apiCogortId;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then((res) => this._checkRes(res));
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}${this._apiCogortId}/users/me`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then((res) => this._checkRes(res));
  }

  editUserInfo({ name, job }) {
    return fetch(`${this._apiUrl}${this._apiCogortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then((res) => this._checkRes(res));
  }
}
