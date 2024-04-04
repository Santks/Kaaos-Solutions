package com.example.TicketGuru.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TicketGuru.domain.Venue;
import com.example.TicketGuru.domain.VenueRepository;

@RestController
public class RestVenueController {

    private static final Logger log = LoggerFactory.getLogger(RestEventController.class);

    @Autowired
    private VenueRepository venueRepo;

    // GET

    // POST
    @PostMapping("/venues")
    public ResponseEntity<Venue> createVenue(@RequestBody Venue newVenue) {
        log.info("Create new venue");
        if (newVenue.getName() == null || newVenue.getAddress() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request!
        }
        try {
            return new ResponseEntity<>(venueRepo.save(newVenue), HttpStatus.CREATED); // 201: Created!
        } catch (Exception e) {
            log.error("Error creating venue", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500: Internal Server Error!
        }
    }

    // PUT

    // DELETE

}