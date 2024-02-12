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
@Table(name="TG_EventCategory")
public class EventCategory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name ="EventCategory_id")
	private Long EventCatId;
	
	@Column(name="Name")
	private String categoryName;
	
	@Column(name="Description")
	private String description;
	
	@JsonIgnore
	@OneToOne(cascade= CascadeType.ALL, mappedBy="eventCategory")
	private Event event;

	//getters and setters
	
	public Long getEventCatId() {
		return EventCatId;
	}

	public void setEventCatId(Long eventCatId) {
		EventCatId = eventCatId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
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

	public void setEvent(Event event) {
		this.event = event;
	}

	@Override
	public String toString() {
		return "EventCategory [EventCatId=" + EventCatId + ", categoryName=" + categoryName + ", description="
				+ description + "]";
	}
	
	

}
