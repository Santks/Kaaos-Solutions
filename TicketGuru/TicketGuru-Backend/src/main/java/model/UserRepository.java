package model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


public interface UserRepository extends CrudRepository<User, Long>{

}
