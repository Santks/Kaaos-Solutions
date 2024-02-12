package model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganiserRepository extends CrudRepository<Organiser, Long> {

}
