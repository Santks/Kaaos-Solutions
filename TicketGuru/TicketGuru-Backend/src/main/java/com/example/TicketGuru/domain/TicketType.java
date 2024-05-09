package com.example.TicketGuru.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "TG_TicketType")
public class TicketType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TicketType_id")
	// @NotNull
	private Long ticketTypeId;

	@Column(name = "Name")
	@NotBlank
	private String name;

	@Column(name = "Description")
	private String description;

	@OneToMany(mappedBy = "ticketType", cascade=CascadeType.PERSIST)
	@JsonManagedReference(value="ticket-tickettype")
	private List<Ticket> tickets;
	
	@Column(name = "Price")
	@NotNull
	private Double price;
	
	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	@ManyToOne
	@JoinColumn(name = "Event_id")
	@JsonBackReference(value="tickettype-event")
	private Event event;

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
	
	public Event getEvent() {
		return event;
	}
	public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

	@Override
	public String toString() {
		return "TicketType [ticketTypeId=" + ticketTypeId + ", name=" + name + ", description=" + description + "]";
	}

	public TicketType() {
		super();
	}
	
	public TicketType(Long ticketTypeId, String name, String description, List<Ticket> tickets) {
		super();
		this.ticketTypeId = ticketTypeId;
		this.name = name;
		this.description = description;
		this.tickets = tickets;
	}

	public TicketType(String name, String description, List<Ticket> tickets, Double price,Event event) {
		super();
		this.name = name;
		this.description = description;
		this.tickets = tickets;
		this.event = event;
		this.price = price;
	}

}
