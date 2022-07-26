class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
    this._headersExt = {...this._headers, ...{"Content-Type": "application/json"}};
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _fetchData(url, options) {
    return fetch(url, options)
      .then(this._handleResponse);
  }

  getInitialCards() {
    return this._fetchData(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  getUserData() {
    return this._fetchData(`${this._baseUrl}/users/me `, {
      headers: this._headers
    });
  }

  updateUserData(userData) {
    return this._fetchData(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headersExt,
      body: JSON.stringify(userData)
    });
  }

  addNewCard(cardData) { 
    return this._fetchData(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headersExt,
      body: JSON.stringify(cardData)
    });
  }

  deleteCard(cardId) {
    return this._fetchData(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  handleLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.unlikeCard(cardId);
    }
    return this.likeCard(cardId);
  }

  likeCard(cardId) {
    return this._fetchData(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers
    });
  }

  unlikeCard(cardId) {
    return this._fetchData(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  updateUserAvatar(userAvatarData) {
    return this._fetchData(`${this._baseUrl}/users/me/avatar`,{
      method: "PATCH",
      headers: this._headersExt,
      body: JSON.stringify(userAvatarData)
    });
  }

  batchFetch(fetchMethods) {
    return Promise.all(fetchMethods);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "68bb178a-4eee-4a74-9e44-5d7e375169e1"
  }
});

export default api;