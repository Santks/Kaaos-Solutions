package com.example.TicketGuru.web;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.example.TicketGuru.domain.TicketType;
import com.example.TicketGuru.domain.TicketTypeRepository;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

@RestController
public class RestTicketTypeController {
	
	private static final Logger log = LoggerFactory.getLogger(RestTicketTypeController.class);
	
	@Autowired
	private TicketTypeRepository ticketTypeRepo;
	
	// GET (all)
    @GetMapping("/tickettype")
    Iterable<TicketType> getAllTicketTypes() {
        log.info("Get all events");
        return ticketTypeRepo.findAll();
    }
    
    // GET (id)
    @GetMapping("/tickettype/id/{tickettypeid}")
    TicketType getTicketTypeById(@PathVariable Long tickettypeid) {
    	log.info("Get tickettype by id"); 	
    	return ticketTypeRepo.findById(tickettypeid).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)); // 404: Not Found!
    }

	//POST
	@PostMapping("/tickettype")
	@ResponseStatus(HttpStatus.CREATED) // 201: Created!
	ResponseEntity<TicketType> createTicketType(@Validated @RequestBody TicketType newTicketType) {
		log.info("Create new event");
		try {
			return new ResponseEntity<>(ticketTypeRepo.save(newTicketType), HttpStatus.CREATED); // 200: OK
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//PUT
	@PutMapping("/tickettype/{id}")
	ResponseEntity<TicketType> editTicketType(@Validated @RequestBody TicketType editedTicket, @PathVariable Long id) {
		log.info("Edit tickettype by id");
		if (editedTicket.getName().isEmpty()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request
		}
		editedTicket.setTicketTypeId(id);
		try {
		return new ResponseEntity<>(ticketTypeRepo.save(editedTicket), HttpStatus.OK); // 200: OK
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500
		}
	}
	
	//DELETE
	@DeleteMapping("/tickettype/{id}")
	ResponseEntity<String> deleteEvent(@PathVariable Long id) {
		log.info("Delete tickettype by id");
		if (ticketTypeRepo.findById(id).isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		ticketTypeRepo.deleteById(id);
		return ResponseEntity.ok("Poistettu");
	}
}