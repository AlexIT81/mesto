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

  setUserInfo(data) {
    const {name, about, avatar, _id} = data;
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.alt = name;
    this._avatar.src = avatar;
    this._myId = _id;
  }

  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }

  getUserId() {
    return this._myId;
  }
}
