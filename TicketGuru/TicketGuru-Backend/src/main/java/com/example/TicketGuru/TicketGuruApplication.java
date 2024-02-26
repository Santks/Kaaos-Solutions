package com.example.TicketGuru;

import java.time.LocalDate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.TicketGuru.domain.Event;
import com.example.TicketGuru.domain.EventRepository;
import com.example.TicketGuru.domain.PostalCode;
import com.example.TicketGuru.domain.PostalCodeRepository;
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
			PostalCodeRepository pcrepository) {
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
			vrepository.save(venue1);
			vrepository.save(venue2);
			vrepository.save(venue3);

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

			log.info("fetch all events");
			for (Event event : erepository.findAll()) {
				log.info(event.toString());
			}
		};

	}

}
