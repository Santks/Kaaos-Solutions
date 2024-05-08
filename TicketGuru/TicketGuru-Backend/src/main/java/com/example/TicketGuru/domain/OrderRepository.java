package com.example.TicketGuru.domain;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long>{
	 List<Order> findByOrderPaid(boolean orderPaid);

	 // Test
	 List<Order> findByTickets_EventId(Long eventId);
}
