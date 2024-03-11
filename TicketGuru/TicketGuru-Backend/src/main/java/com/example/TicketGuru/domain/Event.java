package com.example.TicketGuru.domain;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "TG_Event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Event_id")
    // @NotNull
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Venue_id", referencedColumnName = "Venue_id")
    @JsonBackReference
    @NotNull
    private Venue venue;

    @Column(name = "Name")
    @NotBlank
    private String name;

    @Column(name = "Description")
    private String description;

    @JoinColumn(name = "EventCategory")
    private String eventCategory;

    @Column(name = "StartDate")
    @NotNull
    private LocalDate startDate;

    @Column(name = "EndDate")
    @NotNull
    private LocalDate endDate;

    @Column(name = "eventStatus")
    private char eventSatus;

    @Column(name = "OrganiserName")
    private String organiserName;

    @Column(name = "maxTickets")
    @NotNull
    private long maxTickets;

    public Event() {
        super();
    }

    public Event(Venue venue, String name, String description, String eventCategory, LocalDate startDate, LocalDate endDate,
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

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
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
