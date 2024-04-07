package com.example.TicketGuru.web;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    // PUT Edit venue by venue id
    @PutMapping("/venues/{venueId}")
    public ResponseEntity<Venue> editVenue(@RequestBody Venue editedVenue, @PathVariable Long venueId) {
        if (editedVenue.getName() == null || editedVenue.getPostalCode() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request!
        }
        editedVenue.setId(venueId);
        return new ResponseEntity<>(venueRepo.save(editedVenue), HttpStatus.OK); // 200: OK!
    }

    // DELETE // ONLY WORKS FOR VENUES WITH NO ASSOCIATED EVENTS DUE TO FOREIGN KEY
    // RESTRAINTS
    @DeleteMapping("/venues/{venueId}")
    public ResponseEntity<String> deleteVenue(@PathVariable Long venueId) {
        log.info("Deleting venue by id");
        if (venueRepo.findById(venueId).isEmpty()) {
            log.info("No such venue");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
        }
        try {
            venueRepo.deleteById(venueId);
            return new ResponseEntity<>("Deleted venue", HttpStatus.OK); // 200: OK!
        } catch (Exception e) {
            log.info("Error deleting venue", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500: Internal server error!
        }
    }
}
