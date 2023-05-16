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

  _getInitialCards() {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}${this._apiCogortId}/users/me`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  getServerData() {
    return Promise.all([this._getInitialCards(), this.getUserInfo()]);
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
    }).then(this._checkRes);
  }

  addNewCard(data) {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkRes);
  }

  deleteCard(cardId) {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  setLike(cardId) {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  removeLike(cardId) {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._apiToken,
      },
    }).then(this._checkRes);
  }

  setAvatar(data) {
    return fetch(`${this._apiUrl}${this._apiCogortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._apiToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._checkRes);
  }
}
