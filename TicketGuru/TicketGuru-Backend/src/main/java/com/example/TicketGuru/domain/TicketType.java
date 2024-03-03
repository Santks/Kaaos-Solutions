package com.example.TicketGuru.domain;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "TG_TicketType")
public class TicketType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TicketType_id")
	private Long ticketTypeId;

	@Column(name = "Name")
	private String name;

	@Column(name = "Description")
	private String description;

	@OneToMany(mappedBy = "ticketType", cascade=CascadeType.PERSIST)
	@JsonManagedReference(value="ticket-tickettype")
	private List<Ticket> tickets;

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

	public TicketType(String name, String description, List<Ticket> tickets) {
		super();
		this.name = name;
		this.description = description;
		this.tickets = tickets;
	}

}
