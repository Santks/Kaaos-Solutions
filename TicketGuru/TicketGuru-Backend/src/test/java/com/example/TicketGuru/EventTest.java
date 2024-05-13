package com.example.TicketGuru;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import java.time.LocalDateTime;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.PostalCode;
import com.example.TicketGuru.domain.Venue;

@SpringBootTest
public class EventTest {

    private Venue venue1;
    private Event event1;

    @BeforeEach
    public void setEvent() {
        PostalCode pcode1 = new PostalCode("00250", "Helsinki", "Suomi");

        venue1 = new Venue("Olympiastadion", "Paavo Nurmen tie 1", "040123456789", "demoevent@demomail.com", 36200,
                pcode1);

        event1 = new Event(venue1, "Cool event", "Cool event example", "Cool event", LocalDateTime.parse("2024-02-22T10:15:30"),
        		LocalDateTime.parse("2024-02-24T18:30:00"),
                'U', "Cool events org.", 36000L);
    }

    @Test
    public void EventCreation() {
        assertNotNull(event1);
    }

    @Test
    public void VenueCreation() {
        assertNotNull(venue1);
    }

    @Test
    public void EventName() {
        assertEquals("Cool event", event1.getName());
    }

    @Test
    public void VenueName() {
        assertEquals("Olympiastadion", venue1.getName());
    }

    @Test
    public void EventStartDate() {
        assertEquals(LocalDateTime.parse("2024-02-22T10:15:30"), event1.getStartDate());
    }

    @Test
    public void EventEndDate() {
        assertEquals(LocalDateTime.parse("2024-02-24T18:30:00"), event1.getEndDate());
    }

    @Test
    public void VenuePhoneNumber() {
        assertEquals("040123456789", venue1.getPhone());
    }
}