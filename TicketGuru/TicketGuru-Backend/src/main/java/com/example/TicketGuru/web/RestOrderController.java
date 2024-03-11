package com.example.TicketGuru.web;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

    // GET (all)
    @GetMapping("/orders")
    public ResponseEntity<Iterable<Order>> getAllOrders() {
        log.info("get all orders");
        return new ResponseEntity<>(orderRepo.findAll(), HttpStatus.OK); // 200: OK!
    }

    // GET (by orderId)
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<Order> getByOrderId(@PathVariable Long orderId) {
        log.info("find order by id");
        Optional<Order> order = orderRepo.findById(orderId);
        if (order.isPresent()) {
            return new ResponseEntity<>(order.get(), HttpStatus.OK); // 200: OK!
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
        }
    }

    // POST (create new order)
    @PostMapping("/orders")
    public ResponseEntity<Order> createOrder(@RequestBody Order newOrder) {
        log.info("create new order");
        if (newOrder.getCustomer() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request!
        }
        try {
            return new ResponseEntity<>(orderRepo.save(newOrder), HttpStatus.CREATED); // 201: Created!
        } catch (Exception e) {
            log.error("Error creating order", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500: Internal Server Error!
        }
    }

    // DELETE (by orderId)
    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        log.info("Delete order by id");
        if (orderRepo.findById(orderId).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404: Not Found!
        }
        orderRepo.deleteById(orderId);
        return new ResponseEntity<>("Tilaus poistettu", HttpStatus.OK); // 200: OK!
    }

    // PUT (edit order by orderId)
    @PutMapping("/orders/{orderId}")
    public ResponseEntity<Order> editOrderById(@RequestBody Order editedOrder, @PathVariable Long orderId) {
        log.info("edit order by order id");
        if (editedOrder.getCustomer() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400: Bad Request!
        }
        editedOrder.setOrderId(orderId);
        return new ResponseEntity<>(orderRepo.save(editedOrder), HttpStatus.OK); // 200: OK!
    }

}
