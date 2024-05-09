const apiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/venues'

const headers = {
    'Authorization': 'Basic ' + btoa('admin:admin')
};

export const fetchVenues = () => {
    return fetch(apiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json()
        });
};

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

export const deleteVenue = (id) => {
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