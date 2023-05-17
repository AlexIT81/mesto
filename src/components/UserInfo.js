export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    const { name, about, avatar, _id } = data;
    this._name.textContent = name;
    this._job.textContent = about;
    this._avatar.alt = name;
    this._avatar.src = avatar;
    this._userId = _id;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }

  getUserId() {
    return this._userId;
  }
}
