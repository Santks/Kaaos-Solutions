package com.example.TicketGuru;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.EventRepository;
import com.example.TicketGuru.domain.Order;
import com.example.TicketGuru.domain.OrderRepository;
import com.example.TicketGuru.domain.PostalCode;
import com.example.TicketGuru.domain.PostalCodeRepository;

import com.example.TicketGuru.domain.Ticket;
import com.example.TicketGuru.domain.TicketRepository;
import com.example.TicketGuru.domain.TicketType;
import com.example.TicketGuru.domain.TicketTypeRepository;

import com.example.TicketGuru.domain.User;
import com.example.TicketGuru.domain.UserRepository;
import com.example.TicketGuru.domain.UserRole;
import com.example.TicketGuru.domain.UserRoleRepository;

import com.example.TicketGuru.domain.Venue;
import com.example.TicketGuru.domain.VenueRepository;

@SpringBootApplication
public class TicketGuruApplication {
	private static final Logger log = LoggerFactory.getLogger(TicketGuruApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(TicketGuruApplication.class, args);
	}
}