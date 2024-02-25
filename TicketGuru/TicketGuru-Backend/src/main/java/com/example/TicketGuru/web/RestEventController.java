package com.example.TicketGuru.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.EventRepository;

@RestController
public class RestEventController {
	
	private static final Logger log = LoggerFactory.getLogger(RestEventController.class);
	
	@Autowired
	private EventRepository eventRepo;
	
//	Tänne event rest-rajapinnan metodit
	
	//GET
	
	//POST
	@PostMapping("/events")
	Event createEvent(@RequestBody Event newEvent) {
		log.info("Create new event");
		return eventRepo.save(newEvent);
	}
	
	//PUT
	@PutMapping("/events/{id}")
	Event editEventRest(@RequestBody Event editedEvent, @PathVariable Long id) {
		log.info("Edit event by id");
		editedEvent.setId(id);
		return eventRepo.save(editedEvent);
	}
	
	//DELETE
	@DeleteMapping("/events/{id}")
	void deleteEvent(@PathVariable Long id) {
		log.info("Delete event by id");
		eventRepo.deleteById(id);
	}
}
