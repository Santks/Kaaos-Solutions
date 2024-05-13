// The base URL for the API
const apiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/venues'

// Headers for the API requests, including the Authorization header
const headers = {
    'Authorization': 'Basic ' + btoa('admin@example.com:admin')
};

// Default error message
const errorMessage = "Tapahtui virhe!";

// Function to fetch all venues from the API
export const fetchVenues = () => {
    return fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

// Function to add a new venue to the API
export const addVenue = (data) => {
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

// Function to edit an existing venue in the API
export const editVenue = (id, data) => {
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

// Function to delete a venue from the API
export const deleteVenue = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
        headers: headers,
    }).then(response => {
        if (!response.ok) {
            throw new Error(errorMessage);
        }
    });
};