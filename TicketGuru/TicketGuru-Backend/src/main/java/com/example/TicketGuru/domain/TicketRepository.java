package com.example.TicketGuru.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, Long> {

	List<Ticket> findAllByEventId(Long event);

}