// The base URL for the API
const ApiUrl = 'https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/events';

// Headers for the API requests, including the Authorization header
const headers = {
    'Authorization': 'Basic ' + btoa('admin@example.com:admin')
};

// Default error message
const errorMessage = "Tapahtui virhe!";

// Function to fetch all venues from the API
export const fetchVenues = () => {
    return fetch('https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/venues', { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};

// Function to add a new event to the API
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

// Function to edit an existing event in the API
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

// Function to delete an event from the API
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

// Function to fetch tickets for a specific event from the API
export const fetchEventTickets = (eventid) => {
    return fetch(`https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickets/event/${eventid}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};

// Function to fetch all events from the API + the number of tickets sold (total)
export const fetchEvents = () => {
    return fetch(ApiUrl, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        })
        .then(events => {
            return Promise.all(events.map(event =>
                fetchEventTickets(event.id)
                    .then(tickets => ({ ...event, ticketsSold: tickets.length }))
                    .catch(error => {
                        console.error('Error fetching tickets for event:', event.id, error);
                        return { ...event, ticketsSold: 0 };
                    })
            ));
        });
};