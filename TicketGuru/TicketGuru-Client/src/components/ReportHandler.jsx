// Headers for the API requests, including the Authorization header
const headers = {
    'Authorization': 'Basic ' + btoa('admin@example.com:admin')
};

// Default error message
const errorMessage = "Tapahtui virhe!";

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

// Function to fetch orders for a specific event from the API
export const fetchEventOrders = (eventid) => {
    return fetch(`https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/orders/event/${eventid}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};

// Function to fetch ticket types for a specific event from the API
export const fetchTicketTypes = (eventId) => {
    return fetch(`https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/tickettype/event/${eventId}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json()
        });
};
