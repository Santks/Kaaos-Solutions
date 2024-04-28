import React, { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const ListEvents = () => {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        fetch('https://kaaos-solutions-kaaosticketguru.rahtiapp.fi/events', {
            headers: {
                'Authorization': 'Basic ' + btoa('admin:admin')
            }
        })
            .then(response => response.json())
            .then(data => setRowData(data));
    }, []);

    const columnDefs = [
        { headerName: "Id", field: "id", sortable: true, filter: true, editable: true },
        { headerName: "Name", field: "name", sortable: true, filter: true, editable: true },
        { headerName: "Description", field: "description", sortable: true, filter: true, editable: true },
        { headerName: "Event Category", field: "eventCategory", sortable: true, filter: true, editable: true },
        { headerName: "Start Date", field: "startDate", sortable: true, filter: true, editable: true },
        { headerName: "End Date", field: "endDate", sortable: true, filter: true, editable: true },
        { headerName: "Event Status", field: "eventStatus", sortable: true, filter: true, editable: true },
        { headerName: "Organiser Name", field: "organiserName", sortable: true, filter: true, editable: true },
        { headerName: "Max Tickets", field: "maxTickets", sortable: true, filter: true, editable: true },
    ];

    const onCellValueChanged = (event) => {
        if (event.newValue !== event.oldValue) {
            const updatedData = event.data;
            const id = updatedData.id;

            fetch(`http://kaaos-solutions-kaaosticketguru.rahtiapp.fi/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('admin:admin')
                },
                body: JSON.stringify(updatedData),
            })
                .then(response => {
                    if (response.ok) {
                        return response.text().then(text => {
                            return text ? JSON.parse(text) : {}
                        })
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(data => console.log('Success:', data))
                .catch((error) => console.error('Error:', error));
        }
    };

    return (
        <div className="ag-theme-material" style={{ height: "800px", width: "100%", margin: "auto" }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
                onCellValueChanged={onCellValueChanged}
            />
        </div>
    );
};

export default ListEvents;
