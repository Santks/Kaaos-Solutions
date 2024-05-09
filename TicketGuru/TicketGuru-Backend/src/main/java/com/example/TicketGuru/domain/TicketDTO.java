package com.example.TicketGuru.domain;

import java.util.UUID;
import java.time.LocalDateTime;

public class TicketDTO {

	private Long ticketId;
	private Long eventId;
	private Long ticketTypeId;
	private Double ticketPrice;
	private UUID uuid;
	private LocalDateTime ticketUsed;

	public TicketDTO(Ticket ticket) {
		this.ticketId = ticket.getTicketId();
		this.ticketTypeId = ticket.getTicketType().getTicketTypeId();
		this.ticketPrice = ticket.getTicketType().getPrice();
		this.eventId = ticket.getEvent().getId();
		this.uuid = ticket.getUuid();
		this.ticketUsed = ticket.getTicketUsed();

	}

	public Long getTicketId() {
		return ticketId;
	}

	public void setTicketId(Long ticketId) {
		this.ticketId = ticketId;
	}

	public Long getEventId() {
		return eventId;
	}

	public void setEventId(Long eventId) {
		this.eventId = eventId;
	}

	public Long getTicketTypeId() {
		return ticketTypeId;
	}

	public void setTicketTypeId(Long ticketTypeId) {
		this.ticketTypeId = ticketTypeId;
	}

	public UUID getUuid() {
		return uuid;
	}

	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}

	public LocalDateTime getTicketUsed() {
		return ticketUsed;
	}

	public void setTicketUsed(LocalDateTime ticketUsed) {
		this.ticketUsed = ticketUsed;
	}

	public Double getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(Double ticketPrice) {
		this.ticketPrice = ticketPrice;
	}
}
