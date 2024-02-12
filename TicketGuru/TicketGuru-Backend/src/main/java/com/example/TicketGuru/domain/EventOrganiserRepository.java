package com.example.TicketGuru.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventOrganiserRepository extends CrudRepository<EventOrganiser, Long>{

}
