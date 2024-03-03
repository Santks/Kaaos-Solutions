package com.example.TicketGuru.web;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.TicketGuru.domain.Order;
import com.example.TicketGuru.domain.OrderRepository;

@RestController
public class RestOrderController {

	private static final Logger log = LoggerFactory.getLogger(RestEventController.class);
	
	@Autowired
	private OrderRepository orderRepo;
	
	//GET (all)
	 @GetMapping("/orders")
	    Iterable<Order> getAllOrders() {
	        log.info("get all orders");
	        return orderRepo.findAll();
	    }
	
	//GET (by order id)
	 @GetMapping("/orders/{orderId}")
	    Optional<Order> getByOrderId(@PathVariable Long orderId) {
	        log.info("find order by id");
	        return orderRepo.findById(orderId);
	    }
	
	
	//GET (paid orders)
	 @GetMapping("/orders/paid")
	 public ResponseEntity<List<Order>> getPaidOrders() {
	     List<Order> paidOrders = orderRepo.findByOrderPaid(true);
	     if (paidOrders.isEmpty()) {
	         return ResponseEntity.noContent().build();
	     }
	     return ResponseEntity.ok(paidOrders);
	 }
	
	//POST
	 @PostMapping("/orders")
	 	Order createOrder(@RequestBody Order newOrder) {
		 log.info("create new order");
		 return orderRepo.save(newOrder);
	 }
	
	
	//DELETE
	 @DeleteMapping("/orders/{orderId}")
	 ResponseEntity<String> deleteEvent(@PathVariable Long orderId) {
			log.info("Delete event by id");
			if (orderRepo.findById(orderId).isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			orderRepo.deleteById(orderId);
			return ResponseEntity.ok("Tilaus poistettu");
		}
	
	
	//PUT
	 @PutMapping("/orders/{orderId}")
	 Order editOrderById(@RequestBody Order editedOrder, @PathVariable Long orderId) {
		 log.info("edit order by order id");
		 editedOrder.setOrderId(orderId);
		 return orderRepo.save(editedOrder);
	 }
	
}
