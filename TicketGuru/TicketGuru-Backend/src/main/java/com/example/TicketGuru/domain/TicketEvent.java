package com.example.TicketGuru.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="TG_TicketEvent")
public class TicketEvent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="TicketEvent_id")
	private Long ticketEventId;
	
	@ManyToOne
	@JoinColumn(name="Ticket_id")
	private Ticket ticket;
	
	@ManyToOne
	@JoinColumn(name="Event_id")
	private Event ticevent;
	
	
}
