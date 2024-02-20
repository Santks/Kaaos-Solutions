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
    private long maxTickets;

    public Event() {
        super();
    }

    public Event(Venue venue, String name, String description, String eventCategory, String startDate, String endDate,
            char eventSatus, String organiserName, long maxTickets) {
        this.venue = venue;
        this.name = name;
        this.description = description;
        this.eventCategory = eventCategory;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eventSatus = eventSatus;
        this.organiserName = organiserName;
        this.maxTickets = maxTickets;
    }

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

    public long getMaxTickets() {
        return maxTickets;
    }

    public void setMaxTickets(long maxTickets) {
        this.maxTickets = maxTickets;
    }

    @Override
    public String toString() {
        return "Event [id=" + id + ", venue=" + venue + ", name=" + name + ", description=" + description
                + ", eventCategory=" + eventCategory + ", startDate=" + startDate + ", endDate=" + endDate
                + ", eventSatus=" + eventSatus + ", organiserName=" + organiserName + ", maxTickets=" + maxTickets
                + "]";
    }

}
