package com.example.TicketGuru.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name= "TG_EventStatus")
public class EventStatus {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "EventStatus_id")
	private Long statusId;
	
	@Column(name= "status")
	private String status;
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL, mappedBy="eventStatus")
	private Event event;

	public Long getStatusId() {
		return statusId;
	}

	public void setStatusId(Long statusId) {
		this.statusId = statusId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Event getEvent() {
		return event;
	}

	public void setEvent(Event event) {
		this.event = event;
	}
	
	public EventStatus(Long statusId, String status) {
		this.statusId = statusId;
		this.status = status;
	}

	@Override
	public String toString() {
		return "EventStatus [statusId=" + statusId + ", status=" + status + "]";
	}
	
	

}
