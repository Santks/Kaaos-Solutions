const headers = {
    'Authorization': 'Basic ' + btoa('admin:admin')
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

export const fetchEventOrders = (eventid) => {
    return fetch(`https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/orders/event/${eventid}`, { headers })
        .then(response => {
            if (!response.ok) {
                throw new Error(errorMessage);
            }
            return response.json();
        });
};