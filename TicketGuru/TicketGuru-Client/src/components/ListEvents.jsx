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
        { headerName: "ID", field: "id", sortable: true, filter: true },
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Description", field: "description", sortable: true, filter: true },
        { headerName: "Event Category", field: "eventCategory", sortable: true, filter: true },
        { headerName: "Start Date", field: "startDate", sortable: true, filter: true },
        { headerName: "End Date", field: "endDate", sortable: true, filter: true },
        { headerName: "Event Status", field: "eventStatus", sortable: true, filter: true },
        { headerName: "Organiser Name", field: "organiserName", sortable: true, filter: true },
        { headerName: "Max Tickets", field: "maxTickets", sortable: true, filter: true }
    ];


    return (
        <div className="ag-theme-material" style={{ height: "800px", width: "100%", margin: "auto" }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={rowData}
            />
        </div>
    );
};

export default ListEvents;