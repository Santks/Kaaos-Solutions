package com.example.TicketGuru.domain;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {

	
	// Find all tickets by Event id
	List<Ticket> findAllByEventId(Long event);
	
	
	// find by UUID
    Optional<Ticket> findByUuid(UUID uuid);

}