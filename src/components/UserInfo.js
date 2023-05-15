export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._dataUser = {
      name: this._name.textContent,
      job: this._job.textContent,
    };
    return this._dataUser;
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
    this._avatar.alt = name;
  }

  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
