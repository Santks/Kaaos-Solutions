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

    // @ManyToOne @JoinColumn(name = "EventStatus_id",
    // referencedColumnName = "EventStatus_id") private EventStatus eventStatus;

    // @ManyToOne @JoinColumn(name = "EventCategory_id"),
    // referencedColumnName = "EventCategory_id") private EventCategory
    // eventCategory;

    @Column(name = "StartDate")
    private String startDate;

    @Column(name = "EndDate")
    private String endDate;

    // Constructors, getters, setters and toString()

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

    public Event(Long id, Venue venue, String name, String description, String startDate, String endDate) {
        this.id = id;
        this.venue = venue;
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return "Event [id=" + id + ", venue=" + venue + ", name=" + name + ", description=" + description
                + ", startDate=" + startDate + ", endDate=" + endDate + "]";
    }
}
