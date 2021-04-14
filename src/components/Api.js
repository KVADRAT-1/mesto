export class Api {
    constructor(options) {
        this.options = options
    }

    getInitialCards() {
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    getUserInformation() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    addUserAvatar(data) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    addUserInformation(data) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    getCard(data) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    addLike(cardId) {
        return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this.options.headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    deleteLike(cardId) {
        return fetch(`${this.options.baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }

    deleteCard(cardId) {
        return fetch(`${this.options.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка${res.status}`)
        });
    }
}