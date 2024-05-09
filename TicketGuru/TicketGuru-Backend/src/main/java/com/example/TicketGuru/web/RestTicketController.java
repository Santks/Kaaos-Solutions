package com.example.TicketGuru.web;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.Ticket;
import com.example.TicketGuru.domain.TicketDTO;
import com.example.TicketGuru.domain.TicketRepository;
import com.example.TicketGuru.domain.TicketType;
import com.example.TicketGuru.domain.TicketTypeDTO;

@RestController
public class RestTicketController {
	
	private static final Logger log = LoggerFactory.getLogger(RestEventController.class);
	
	@Autowired
	private TicketRepository ticketRepo;
	
	// GET all tickets associated with an event
	@GetMapping("/tickets/event/{eventid}")
    public ResponseEntity<Iterable<TicketDTO>> getAllTicketsByEventId(@PathVariable Long eventid) {
        log.info("Get all tickets in event");
        Iterable<Ticket> tickettypes = ticketRepo.findAllByEventId(eventid);
        List<TicketDTO> ticketsDTO = new ArrayList<>();
        for (Ticket tickettype : tickettypes) {
        	TicketDTO ticketDTO = new TicketDTO(tickettype);
        	ticketsDTO.add(ticketDTO);
        }
        return new ResponseEntity<>(ticketsDTO, HttpStatus.OK); // 200: OK!
    }
    
	// GET ticket by it's own id
	@GetMapping("tickets/{ticketid}")
	public ResponseEntity<TicketDTO> getTicketByTicketId(@PathVariable Long ticketid) {
		Ticket ticket = ticketRepo.findById(ticketid).orElse(null);
		if (ticket != null) {
			TicketDTO stripped = new TicketDTO(ticket);
			return new ResponseEntity<>(stripped, HttpStatus.OK); // 200: OK!
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
		}
	}
	
	// GET ticket by UUID
	@GetMapping("/tickets/uuid/{uuid}")
	public ResponseEntity<TicketDTO> getTicketByUuid(@PathVariable UUID uuid) {
	    Ticket ticket = ticketRepo.findByUuid(uuid).orElse(null);
	    if (ticket != null) {
	    	TicketDTO stripped = new TicketDTO(ticket);
			return new ResponseEntity<>(stripped, HttpStatus.OK); // 200: OK!
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
	    }
	}
	
	// POST create a new ticket
	@PostMapping("/tickets")
	public ResponseEntity<Ticket> createTicket(@RequestBody Ticket newTicket) {
//	    if (newTicket.getPrice() == null) {
//	        return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request!
//	    }
	    try {
	        return new ResponseEntity<>(ticketRepo.save(newTicket), HttpStatus.CREATED); // 201: Created!
	    } catch (Exception e) {
	        log.error("Error creating ticket", e);
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500: Internal Server Error!
	    }
	}
	
	// PUT edit pre-existing ticket
	@PutMapping("/tickets/{ticketid}")
	public ResponseEntity<Ticket> editTicket(@RequestBody Ticket editedTicket, @PathVariable Long ticketid) {
//		if (editedTicket.getPrice() == null) {
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request!
//		}
		editedTicket.setTicketId(ticketid);
		return new ResponseEntity<>(ticketRepo.save(editedTicket), HttpStatus.OK); // 200: OK!
	}
	
	// DELETE
	@DeleteMapping("/tickets/{ticketid}")
	public ResponseEntity<String> deleteTicket(@PathVariable Long ticketid) {
		log.info("Deleting ticket by id");
		if (ticketRepo.findById(ticketid).isEmpty()) {
			log.info("No such ticket");
			return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
		}
		ticketRepo.deleteById(ticketid);
		return new ResponseEntity<>("Deleted ticket", HttpStatus.OK); // 200: OK!
	}
	
	// PATCH (TicketUsed)
	@PatchMapping("/tickets/uuid/{uuid}")
	public ResponseEntity<Ticket> TicketUsed(@PathVariable UUID uuid) {
	    Optional<Ticket> existingTicket = ticketRepo.findByUuid(uuid);
	    if (!existingTicket.isPresent()) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
	    }
	    Ticket currentTicket = existingTicket.get();
	    currentTicket.setTicketUsed(LocalDateTime.now());
	    try {
	        return new ResponseEntity<>(ticketRepo.save(currentTicket), HttpStatus.OK); // 200: OK!
	    } catch (Exception e) {
	        log.error("Error updating ticket", e);
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500: Internal Server Error!
	    }
	}

}