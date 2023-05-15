export default class Api {
  constructor(apiToken, apiUrl, apiCogortId) {
    this._apiToken = apiToken;
    this._apiUrl = apiUrl;
    this._apiCogortId = apiCogortId;
  }

  getInitialCards() {
    return fetch(`${this._apiUrl}${this._apiCogortId}/cards`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {
    return fetch(`${this._apiUrl}${this._apiCogortId}/users/me`, {
      headers: {
        authorization: this._apiToken,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  // другие методы работы с API
}
