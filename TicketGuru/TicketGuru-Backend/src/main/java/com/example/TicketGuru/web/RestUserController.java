package com.example.TicketGuru.web;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import com.example.TicketGuru.domain.User;
import com.example.TicketGuru.domain.UserRepository;
import com.example.TicketGuru.service.UserService;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.WebRequest;

@RestController
public class RestUserController {

	private static final Logger log = LoggerFactory.getLogger(RestUserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository userRepo;


	// GET (all)
	@GetMapping("/users")
	Iterable<User> getAllEvents() {
		log.info("Get all events");
		return userRepo.findAll();
	}

	// GET (id)
	@GetMapping("/users/id/{id}")
	User getUserById(@PathVariable Long id) {
		log.info("Get user by id");
		return userRepo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)); // 404: Not Found!
	}
	// GET (email)
	@GetMapping("/users/email/{emailaddress}") // exact address, ignores case
	User getUserById(@PathVariable String emailaddress) {
		log.info("Get user by email address");
		return userRepo.findByEmail(emailaddress).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)); // 404: Not Found!
	}


	//POST
	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED) // 201: Created!
	ResponseEntity<User> createEvent(@Validated @RequestBody User newUser) {
		log.info("Create new user");
		Optional<User> existingUser = userRepo.findByEmail(newUser.getEmail());
		if (existingUser.isPresent()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request
		} 
		try {
			User savedUser = userService.registerNewUser(newUser);

			// Lähetä käyttäjälle salasana (email, txt, savumerkki)

			return new ResponseEntity<>(savedUser, HttpStatus.CREATED); // 200: OK
		}
		catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//PUT
	@PutMapping("/users/{id}")
	ResponseEntity<User> editUserRest(@Validated @RequestBody User editedUser, @PathVariable Long id) {
		log.info("Edit user by id");
		if (editedUser.getEmail().isEmpty()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request
		}
		editedUser.setUserId(id);
		try {
			editedUser.setPassword(passwordEncoder.encode(editedUser.getPassword()));
			return new ResponseEntity<>(userRepo.save(editedUser), HttpStatus.OK); // 200: OK
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500: Error
		}
	}


	//DELETE
	@DeleteMapping("/users/{id}")
	ResponseEntity<String> deleteEvent(@PathVariable Long id) {
		log.info("Delete event by id");
		if (userRepo.findById(id).isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		userRepo.deleteById(id);
		return ResponseEntity.ok("Poistettu");
	}
}