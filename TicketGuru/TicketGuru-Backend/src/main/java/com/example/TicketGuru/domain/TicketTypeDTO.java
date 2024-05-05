package com.example.TicketGuru.domain;
public class TicketTypeDTO {

    private Long ticketTypeId;
    private String name;
    private String description;

    public TicketTypeDTO(TicketType ticketType) {
        this.ticketTypeId = ticketType.getTicketTypeId();
        this.name = ticketType.getName();
        this.description = ticketType.getDescription();
    }

    // Getters and setters
    public Long getTicketTypeId() {
        return ticketTypeId;
    }

    public void setTicketTypeId(Long ticketTypeId) {
        this.ticketTypeId = ticketTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}