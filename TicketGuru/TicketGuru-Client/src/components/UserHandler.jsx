const apiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/users'

const headers = {
    'Authorization': 'Basic ' + btoa('admin@example.com:admin')
};

export const fetchUsers = () => {
    return fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

export const addUser = (data) => {
    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

export const editUser = (id, data) => {
    return fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

export const deleteUser = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};