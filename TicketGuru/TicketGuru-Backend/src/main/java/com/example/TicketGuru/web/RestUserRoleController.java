package com.example.TicketGuru.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.TicketGuru.domain.UserRole;
import com.example.TicketGuru.domain.UserRoleRepository;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/userroles")
public class RestUserRoleController {

	@Autowired
	private UserRoleRepository userRoleRepository;

	@GetMapping("")
	public List<UserRole> getAllUserRoles() {
		Iterable<UserRole> iterable = userRoleRepository.findAll();
		List<UserRole> list = new ArrayList<>();
		iterable.forEach(list::add);
		return list;
	}

	@PostMapping("")
	public ResponseEntity<UserRole> createUserRole(@RequestBody UserRole userRole) {
		if (userRole.getUserRoleName() == null || userRole.getUserRoleName().isEmpty()) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<>(userRoleRepository.save(userRole), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public ResponseEntity<UserRole> updateUserRole(@PathVariable Long id, @RequestBody UserRole userRole) {
		UserRole existingUserRole = userRoleRepository.findById(id).orElse(null);
		if (existingUserRole == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		existingUserRole.setUserRoleName(userRole.getUserRoleName());
		return new ResponseEntity<>(userRoleRepository.save(existingUserRole), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUserRole(@PathVariable Long id) {
		if (!userRoleRepository.existsById(id)) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		userRoleRepository.deleteById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
