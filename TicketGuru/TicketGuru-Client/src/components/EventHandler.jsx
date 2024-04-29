const ApiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/events';

const headers = {
    'Authorization': 'Basic ' + btoa('admin:admin')
};

const errorMessage = "Homma meni ihan wilduks!";


export const fetchEvents = () => {
    return fetch(ApiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};

export const addEvent = (data) => {
    return fetch(ApiUrl, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error(errorMessage);
        }
        return response.json();
    });
};

export const editEvent = (id, data) => {
    return fetch(`${ApiUrl}/${id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            throw new Error(errorMessage);
        }
        return response.json();
    });
};

export const deleteEvent = (id) => {
    return fetch(`${ApiUrl}/${id}`, {
        method: 'DELETE',
        headers
    }).then(response => {
        if (!response.ok) {
            throw new Error(errorMessage);
        }
    });
};