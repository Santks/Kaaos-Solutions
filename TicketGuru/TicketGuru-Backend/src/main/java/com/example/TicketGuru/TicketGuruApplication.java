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

	@Bean
	public CommandLineRunner eventDemo(EventRepository erepository, VenueRepository vrepository,
			PostalCodeRepository pcrepository, TicketRepository tkrepository,
			TicketTypeRepository tktrepository, OrderRepository orderRepo,
			UserRoleRepository urRepository, UserRepository userRepo) {

		return (args) -> {
			log.info("Save some events");

			PostalCode pcode1 = new PostalCode("00250", "Helsinki", "Suomi");
			PostalCode pcode2 = new PostalCode("33100", "Tampere", "Suomi");
			PostalCode pcode3 = new PostalCode("20720", "Turku", "Suomi");
			pcrepository.save(pcode1);
			pcrepository.save(pcode2);
			pcrepository.save(pcode3);

			Venue venue1 = new Venue("Olympiastadion", "Paavo Nurmen tie 1", "040123456789", "demoevent@demomail.com",
					36200, pcode1);
			Venue venue2 = new Venue("Tampereen stadion ", "Ratinan rantatie 1", "0409876543", "filler@demomail.com",
					16800, pcode2);
			Venue venue3 = new Venue("Veritas stadiom", "Hippoksentie 6", "04000099887", "bababooey@fafafooey.com",
					9000, pcode3);
			Venue venue4 = new Venue("No events for this venue", "Hippoksentie 6", "04000099887", "bababooey@fafafooey.com",
					9000, pcode3);
			vrepository.save(venue1);
			vrepository.save(venue2);
			vrepository.save(venue3);
			vrepository.save(venue4);

			// U=upcoming
			Event coolEvent = new Event(venue1, "Cool event", "Cool event example", "Cool event",
					LocalDate.parse("2024-02-22"), LocalDate.parse("2024-02-24"),
					'U', "Cool events org.", 36000L);

			Event fakeEvent = new Event(venue2, "Cool event", "Fake event example", "Fake event",
					LocalDate.parse("2024-02-25"), LocalDate.parse("2024-02-26"),
					'U', "Cool events org.", 16600L);

			Event demoEvent = new Event(venue3, "Cool event", "Example of an event", "Demo event",
					LocalDate.parse("2024-02-28"), LocalDate.parse("2024-02-29"),
					'U', "Demo events co.", 8800L);

			erepository.save(coolEvent);
			erepository.save(fakeEvent);
			erepository.save(demoEvent);

			UserRole customer = new UserRole("customer");
			UserRole worker = new UserRole("Salesman");

			urRepository.save(customer);
			urRepository.save(worker);

			User demo = new User("John", "Doe", "john@doe.com", customer);
			User demo2 = new User("Jane", "Doe", "jane@doe.com", customer);
			User seller = new User("Mike", "Man", "mikeman@ticketGuru.com", worker);
			User seller2 = new User("Daisy", "Duck", "daisyduck@ticketGuru.com", worker);

			userRepo.save(demo);
			userRepo.save(demo2);
			userRepo.save(seller);
			userRepo.save(seller2);

			Order order1 = new Order(demo, LocalDate.parse("2024-03-01"), 31.99, true, seller);
			Order order2 = new Order(demo2, LocalDate.parse("2024-03-01"), 23.45, false, seller2);

			orderRepo.save(order1);
			orderRepo.save(order2);

			//
			List<Ticket> listtickets = new ArrayList<Ticket>();
			TicketType tickettype1 = new TicketType("Aikuiset", "Yli 18-vuotta täyttäneiden lippu", listtickets);
			TicketType tickettype2 = new TicketType("Lapset", "Alle 18-vuotiaiden liput", listtickets);
			tktrepository.save(tickettype1);
			tktrepository.save(tickettype2);

			Ticket ticket1 = new Ticket(demoEvent, tickettype1, order1, 31.99, null);
			Ticket ticket2 = new Ticket(fakeEvent, tickettype2, order2, 23.45, LocalDateTime.now());
			Ticket ticket3 = new Ticket(coolEvent, tickettype2, order2, 23.45, null);
			Ticket ticket4 = new Ticket(demoEvent, tickettype1, order1, 31.99, null);
			tkrepository.save(ticket1);
			tkrepository.save(ticket2);
			tkrepository.save(ticket3);
			tkrepository.save(ticket4);

			log.info("fetch all events");
			for (Event event : erepository.findAll()) {
				log.info(event.toString());
			}
			;

			log.info(ticket1.toString());
			log.info(ticket2.toString());

			log.info(order1.toString());
			log.info(order2.toString());

			for (TicketType tickettype : tktrepository.findAll()) {
				log.info(tickettype.toString());
			}

		};

	}

}
