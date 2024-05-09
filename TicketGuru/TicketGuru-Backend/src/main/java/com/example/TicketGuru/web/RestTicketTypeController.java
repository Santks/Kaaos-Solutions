package com.example.TicketGuru.web;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
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
import com.example.TicketGuru.domain.TicketTypeDTO;
import com.example.TicketGuru.domain.TicketTypeRepository;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.beans.BeanUtils;

@RestController
public class RestTicketTypeController {
	
	private static final Logger log = LoggerFactory.getLogger(RestTicketTypeController.class);
	
	@Autowired
	private TicketTypeRepository ticketTypeRepo;
	
	// GET (all)
    @GetMapping("/tickettype")
    Iterable<TicketTypeDTO> getAllTicketTypes() {
        log.info("Get all events");
        Iterable<TicketType> tickettypes = ticketTypeRepo.findAll();
        List<TicketTypeDTO> tickettypesDTO = new ArrayList<>();
        for (TicketType tickettype : tickettypes) {
        	TicketTypeDTO tickettypeDTO = new TicketTypeDTO(tickettype);
        	tickettypesDTO.add(tickettypeDTO);
        }
        return tickettypesDTO;
    }
    
    
    
    // GET (id)
    @GetMapping("/tickettype/id/{tickettypeid}")
    ResponseEntity<TicketTypeDTO> getTicketTypeById(@PathVariable Long tickettypeid) {
    	log.info("Get tickettype by id");
    	TicketType foundTicketType = ticketTypeRepo.findById(tickettypeid).orElse(null);
    	if (foundTicketType == null) {
    		return ResponseEntity.notFound().build();
    	}
    	TicketTypeDTO stripped = new TicketTypeDTO(foundTicketType);
    	return ResponseEntity.ok(stripped);
    	
    }
    
    @GetMapping("/tickettype/event/{eventId}")
    Iterable<TicketTypeDTO> getTicketTypeByEventId(@PathVariable Long eventId) {
    	log.info("Get tickettypes by event");
    	Iterable<TicketType> tickettypes = ticketTypeRepo.findByEventId(eventId);
    	List<TicketTypeDTO> tickettypesDTO = new ArrayList<>();
        for (TicketType tickettype : tickettypes) {
        	TicketTypeDTO tickettypeDTO = new TicketTypeDTO(tickettype);
        	tickettypesDTO.add(tickettypeDTO);
        }
    	return tickettypesDTO;
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