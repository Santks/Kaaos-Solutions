package com.example.TicketGuru.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.TicketGuru.domain.TicketRepository;

@RestController
public class RestTicketController {
	
	@Autowired
	private TicketRepository ticketRepo;
	
	// GET
	//@GetMapping
	// POST
	//@PostMapping
	// PUT
	//@PutMapping
	// DELETE
	//@DeleteMapping()
	//
}
