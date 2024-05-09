package com.example.TicketGuru.domain;

public class TicketTypeDTO {

    private Long ticketTypeId;
    private Long eventId;
    private String name;
    private String description;
    private Double price;

    public TicketTypeDTO(TicketType ticketType) {
        this.ticketTypeId = ticketType.getTicketTypeId();
        this.eventId = ticketType.getEvent().getId();
        this.name = ticketType.getName();
        this.description = ticketType.getDescription();
        this.price = ticketType.getPrice();
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

    @Override
    public String toString() {
        return "TicketTypeDTO [ticketTypeId=" + ticketTypeId + ", name=" + name + ", description=" + description + "]";
    }

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long event) {
		this.eventId = event;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

}