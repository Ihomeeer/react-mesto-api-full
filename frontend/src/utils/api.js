import React from 'react';

//Класс содержит всю логику для работы с API
class Api extends React.Component {
  constructor({props, baseUrl, headers}) {
    super(props);
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  //проверка состояния промиса, чтобы не писать одно и то же сто тыщ раз
  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //получение информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkStatus(res));
  }

  //обновление информации о пользователе с сервера
  sendUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        name: userData.name,
        about: userData.about
      })
    })
    .then(res => this._checkStatus(res));
  }

  //получение списка карточек с сервера при старте страницы
  getDefaultCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._checkStatus(res));
  }

  //отправка новой карточки на сервер
  sendNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(res => this._checkStatus(res));
  }

  //удаление карточки с сервера
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
      })
      .then(res => this._checkStatus(res));
  }

  //запрос на добавление лайка на сервер или его удаление
  toggleLike(isLiked, id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
      })
    .then(res => this._checkStatus(res));
  }

  //запрос на обновление аватара
  setAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
        avatar: userData
      })
    })
    .then(res => this._checkStatus(res))
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
});

export default api;
