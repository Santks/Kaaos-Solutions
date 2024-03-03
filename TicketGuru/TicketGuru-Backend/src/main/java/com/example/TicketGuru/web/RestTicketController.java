package com.example.TicketGuru.web;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.Ticket;
import com.example.TicketGuru.domain.TicketRepository;

@RestController
public class RestTicketController {
	
	private static final Logger log = LoggerFactory.getLogger(RestEventController.class);
	
	@Autowired
	private TicketRepository ticketRepo;
	
	// GET all tickets associated with an event
	@GetMapping("/tickets/event/{eventid}")
    Iterable<Ticket> getAllTicketsByEventId(@PathVariable Long eventid) {
        log.info("Get all events");
        return ticketRepo.findAllByEventId(eventid);
    }
    
    // GET ticket associated with a specific order
//    @GetMapping("/tickets/order/{id}")
//    Optional<Ticket> getEventById(@PathVariable Long id) {
//        log.info("Get event by id");
//        return ticketRepo.findById(id);
//    }
	// POST
	//@PostMapping
	// PUT
	//@PutMapping
	// DELETE
	//@DeleteMapping()
	//
}
