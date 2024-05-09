package com.example.TicketGuru.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketTypeRepository extends CrudRepository<TicketType, Long> {
	Optional<TicketType> findByTicketTypeId(Long tickettypeid);
//	Optional<ArrayList> findAllByEventId();
	Iterable<TicketType> findByEventId(Long eventid);
}
