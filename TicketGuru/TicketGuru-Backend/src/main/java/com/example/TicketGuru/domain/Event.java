package com.example.TicketGuru.domain;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name = "TG_Event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Event_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Venue_id", referencedColumnName = "Venue_id")
    private Venue venue;

    @Column(name = "Name")
    private String name;

    @Column(name = "Description")
    private String description;

    @JoinColumn(name = "EventCategory") 
    private String eventCategory;
       
    @Column(name = "StartDate")
    private String startDate;

    @Column(name = "EndDate")
    private String endDate;
    
    @Column(name = "eventStatus")
    private char eventSatus;
    
    @Column(name = "OrganiserName")
    private String organiserName;
    
    @Column(name = "maxTickets")
    private Long maxTickets;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Venue getVenue() {
		return venue;
	}

	public void setVenue(Venue venue) {
		this.venue = venue;
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

	public String getEventCategory() {
		return eventCategory;
	}

	public void setEventCategory(String eventCategory) {
		this.eventCategory = eventCategory;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public char getEventSatus() {
		return eventSatus;
	}

	public void setEventSatus(char eventSatus) {
		this.eventSatus = eventSatus;
	}

	public String getOrganiserName() {
		return organiserName;
	}

	public void setOrganiserName(String organiserName) {
		this.organiserName = organiserName;
	}

	public Long getMaxTickets() {
		return maxTickets;
	}

	public void setMaxTickets(Long maxTickets) {
		this.maxTickets = maxTickets;
	}

	

}
