package com.example.TicketGuru.domain;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import java.util.Set;

@Entity
@Table(name= "TG_Ticket")
public class Ticket {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "Ticket_id")
	private Long ticketId;
	
	@ManyToOne
	@JoinColumn(name="Event_id")
	private Event event;
	
	@ManyToOne
	@JoinColumn(name="TicketType_id")
	private TicketType ticketType;
	
	@ManyToOne
	@JoinColumn(name="Order_id")
	private Order order;
	
	@Column(name= "Price")
	private Double price;
	
	@Column(name= "TicketUsed")
	private Boolean ticketUsed;
	
	@OneToMany(mappedBy = "ticket")
	Set<TicketEvent> ticketEvents;

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

	public Set<TicketEvent> getTicketEvents() {
		return ticketEvents;
	}

	public void setTicketEvents(Set<TicketEvent> ticketEvents) {
		this.ticketEvents = ticketEvents;
	}

	@Override
	public String toString() {
		return "Ticket [ticketId=" + ticketId + ", event=" + event + ", ticketType=" + ticketType + ", price=" + price
				+ ", ticketUsed=" + ticketUsed + "]";
	}

}
