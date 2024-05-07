package com.example.TicketGuru.web;

import java.util.List;
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
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;
import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.EventRepository;
import com.example.TicketGuru.domain.Venue;
import com.example.TicketGuru.domain.VenueRepository;


@RestController
public class RestEventController {
	
	private static final Logger log = LoggerFactory.getLogger(RestEventController.class);
	
	@Autowired
	private EventRepository eventRepo;
	private VenueRepository venueRepo;
	
	
	// GET (all)
    @GetMapping("/events")
    Iterable<Event> getAllEvents() {
        log.info("Get all events");
        return eventRepo.findAll();
    }
    
    // GET (id)
    @GetMapping("/events/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventRepo.findEventWithVenue(id);
        if (event == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND); // 404: Not Found!
        }
        return new ResponseEntity<>(event, HttpStatus.OK); // 200: OK!
    }


    
    // GET (date)
    @GetMapping("/events/date/{date}")
    public List<Event> getEventByDate(@PathVariable String date) {
        log.info("Get event by date");
        LocalDate localDate = LocalDate.parse(date);
        return eventRepo.findEventsByDate(localDate);
    }
    
	
	//POST
	@PostMapping("/events")
	@ResponseStatus(HttpStatus.CREATED) // 201: Created!
	Event createEvent(@Validated @RequestBody Event newEvent) {
		log.info("Create new event");
		return eventRepo.save(newEvent);
	}
	
	//PUT
	@PutMapping("/events/{id}")
	Event editEventRest(@Validated @RequestBody Event editedEvent, @PathVariable Long id) {
		log.info("Edit event by id");
		editedEvent.setId(id);
		return eventRepo.save(editedEvent);
	}
	
	//DELETE
	@DeleteMapping("/events/{id}")
	ResponseEntity<String> deleteEvent(@PathVariable Long id) {
		log.info("Delete event by id");
		if (eventRepo.findById(id).isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		eventRepo.deleteById(id);
		return ResponseEntity.ok("Poistettu");
	}
}