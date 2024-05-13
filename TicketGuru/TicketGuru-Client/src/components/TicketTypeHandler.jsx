// The base URL for the API
const apiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickettype'

// Headers for the API requests, including the Authorization header
const headers = {
    'Authorization': 'Basic ' + btoa('admin@example.com:admin')
};

// Function to fetch ticket types for a specific event from the API
export const fetchTicketTypes = (eventId) => {
    return fetch(`https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickettype/event/${eventId}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

// Function to add a new ticket type to the API
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

// Function to edit an existing ticket type in the API
export const editTicketType = (id, data) => {
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

// Function to delete a ticket type from the API
export const deleteTicketType = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers
    }).then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
        }
    });
};