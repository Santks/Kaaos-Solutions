package com.example.TicketGuru.domain;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name= "TG_TicketType")
public class TicketType {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "TicketType_id")
	private Long ticketTypeId;
	
	@Column(name= "Name")
	private String name;
	
	@Column(name= "Description")
	private String description;
	
	@OneToMany(mappedBy="ticketType")
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

}
