package com.example.TicketGuru.web;

import com.example.TicketGuru.domain.Order;
import com.example.TicketGuru.domain.OrderRepository;
import com.example.TicketGuru.domain.User;
import com.example.TicketGuru.domain.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RestOrderControllerIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private OrderRepository orderRepo;

    @Test
    public void testCreateReadDelete() {
        UserRole userRole = new UserRole("ROLE_USER");
        User customer = new User("testFirstName", "testLastName", "testEmail@test.com", userRole);
        Order order = new Order(customer, LocalDate.now(), 100.0, false, customer);

        ResponseEntity<Order> entity = restTemplate.postForEntity("/orders", order, Order.class);

        Order[] orders = restTemplate.getForObject("/orders", Order[].class);
        assertTrue(orders.length > 0);

        restTemplate.delete("/orders/" + entity.getBody().getOrderId());
        orders = restTemplate.getForObject("/orders", Order[].class);
        assertEquals(0, orders.length);
    }
}
