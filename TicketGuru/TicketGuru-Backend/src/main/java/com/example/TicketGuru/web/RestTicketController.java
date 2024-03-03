package com.example.TicketGuru.web;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
	// GET ticket by it's own id
	@GetMapping("tickets/{ticketid}")
	Optional<Ticket> getTicketByTicketId(@PathVariable Long ticketid) {
		return ticketRepo.findById(ticketid);
	}
	// POST create a new ticket
	@PostMapping(value = "/tickets", consumes = {"application/json"})
	Ticket createTicket(@RequestBody Ticket newTicket) {
		return ticketRepo.save(newTicket);
	};
	
	// PUT edit pre-existing ticket
	@PutMapping("/tickets/{ticketid}")
	Ticket editTicket(@RequestBody Ticket editedTicket, @PathVariable Long ticketid) {
		editedTicket.setTicketId(ticketid);
		return ticketRepo.save(editedTicket);
	}
	
	// DELETE
	@DeleteMapping("/tickets/{ticketid}")
	ResponseEntity<String> deleteTicket(@PathVariable Long ticketid) {
		if (ticketRepo.findById(ticketid).isEmpty()) {
			log.info("no such ticket");
			return ResponseEntity.notFound().build();
		}
		log.info("deleting ticket by id");
		ticketRepo.deleteById(ticketid);
		return ResponseEntity.ok("deleted ticket");
	}
	//
}
