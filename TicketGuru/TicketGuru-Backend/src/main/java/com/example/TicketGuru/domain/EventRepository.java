package com.example.TicketGuru.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventRepository extends CrudRepository<Event, Long>{

	// Haetaan kaikki tapahtumat jotka ovat alkamassa tai menossa tiettynä päivänä (:date)
	@Query("SELECT e FROM Event e WHERE e.startDate = :date OR e.endDate = :date")
	List<Event> findEventsByDate(@Param("date") LocalDate date);

	@Query("SELECT e FROM Event e JOIN FETCH e.venue WHERE e.id = :id")
	Event findEventWithVenue(@Param("id") Long id);

}