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

export const fetchVenues = () => {
    return fetch('https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/venues', { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};

export const addEvent = (data, callback) => {
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
    }).then(data => {
        callback();
        return data;
    });
};

export const editEvent = (id, data, callback) => {
    return fetch(`${ApiUrl}/${id}`, {
        method: 'PUT',
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
    }).then(data => {
        callback();
        return data;
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

export const fetchEventTickets = (eventid) => {
    return fetch(`https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickets/event/${eventid}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};
