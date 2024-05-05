const apiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickettype'

const headers = {
    'Authorization': 'Basic ' + btoa('admin:admin')
};

export const fetchTicketTypes = () => {
    return fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

export const addTicketType = (data) => {
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

export const editTicketType = (id, data) => {
    return fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

export const deleteTicketType = (id) => {
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