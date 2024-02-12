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
@Table(name="TG_EventOrganiser")
public class EventOrganiser {
	
	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	@Column(name="EventOrganiser_id")
	private Long eventOrganiserId;
	
	@ManyToOne
	@JoinColumn(name="Event_id")
	private Event event;
	
	@ManyToOne
	@JoinColumn(name="Organiser_id")
	private Organiser organiser;

	public Long getEventOrganiserId() {
		return eventOrganiserId;
	}

	public void setEventOrganiserId(Long eventOrganiserId) {
		this.eventOrganiserId = eventOrganiserId;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}

	public Organiser getOrganiser() {
		return organiser;
	}

	public void setOrganiser(Organiser organiser) {
		this.organiser = organiser;
	}

	@Override
	public String toString() {
		return "EventOrganiser [eventOrganiserId=" + eventOrganiserId + ", event=" + event + ", organiser=" + organiser
				+ "]";
	}
	
	
	

}
