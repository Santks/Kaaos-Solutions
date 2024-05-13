// The base URL for the API
const apiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/users'

// Headers for the API requests, including the Authorization header
const headers = {
    'Authorization': 'Basic ' + btoa('admin@example.com:admin')
};

// Default error message
const errorMessage = "Tapahtui virhe!";

// Function to fetch all users from the API
export const fetchUsers = () => {
    return fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

// Function to add a new user to the API
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

// Function to edit an existing user in the API
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

// Function to delete a user from the API
export const deleteUser = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: headers,
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    });
};