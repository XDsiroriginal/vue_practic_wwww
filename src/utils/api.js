const API = 'http://lifestealer86.ru/api-shop';

export const loginRequest = (user) => {
    return fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json().then((data) => {
                if (data.error) {
                    if (data.error.code === 401) {
                        alert('Неправильные логин или пароль');
                    } else {
                        alert(data.error.message || 'Ошибка авторизации');
                    }
                    return Promise.reject(new Error(data.error.message));
                }
                return data;
            });
        })
        .then((result) => {
            if (result.data && result.data.user_token) {
                return result.data.user_token;
                console.log('проверка токена')
            }
            throw new Error('Неверный формат ответа');
        })
        .catch((error) => {
            if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                alert('Нет соединения с сервером');
            }
            throw error;
        });
};