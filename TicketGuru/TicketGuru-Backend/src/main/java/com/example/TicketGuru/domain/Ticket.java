package com.example.TicketGuru.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "TG_Ticket")
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Ticket_id")
	// @NotNull
	private Long ticketId;

	@ManyToOne
	@JoinColumn(name = "Event_id")
	@JsonBackReference
	@NotNull
	private Event event;

	@ManyToOne
	@JoinColumn(name = "TicketType_id")
	@JsonBackReference(value="ticket-tickettype")
	@NotNull
	private TicketType ticketType;

	@ManyToOne
	@JoinColumn(name = "Order_id")
	@JsonBackReference(value="ticket-order")
	@NotNull
	private Order order;

	@Column(name = "Price")
	@NotNull
	private Double price;

	@Column(name = "TicketUsed")
	@NotNull
	private Boolean ticketUsed;

	public Long getTicketId() {
		return ticketId;
	}

	public void setTicketId(Long ticketId) {
		this.ticketId = ticketId;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public TicketType getTicketType() {
		return ticketType;
	}

	public void setTicketType(TicketType ticketType) {
		this.ticketType = ticketType;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Boolean getTicketUsed() {
		return ticketUsed;
	}

	public void setTicketUsed(Boolean ticketUsed) {
		this.ticketUsed = ticketUsed;
	}

	@Override
	public String toString() {
		return "Ticket [ticketId=" + ticketId + ", event=" + event + ", ticketType=" + ticketType + ", price=" + price
				+ ", ticketUsed=" + ticketUsed + "]";
	}

	public Ticket() {
		super();
	}
	
	public Ticket(Long ticketId, Event event, TicketType ticketType, Order order, Double price, Boolean ticketUsed) {
		super();
		this.ticketId = ticketId;
		this.event = event;
		this.ticketType = ticketType;
		this.order = order;
		this.price = price;
		this.ticketUsed = ticketUsed;
	}
	
	public Ticket(Event event, TicketType ticketType, Order order, Double price, Boolean ticketUsed) {
		super();
		this.event = event;
		this.ticketType = ticketType;
		this.order = order;
		this.price = price;
		this.ticketUsed = ticketUsed;
	}
	public Ticket(Double price, Boolean ticketUsed) {
		super();
		this.price = price;
		this.ticketUsed = ticketUsed;
	}
}
