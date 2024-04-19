package com.example.TicketGuru;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.TicketGuru.domain.Order;
import com.example.TicketGuru.domain.User;
import com.example.TicketGuru.domain.UserRole;


@SpringBootTest
public class OrderTest {

    private Order order;

    @BeforeEach
    public void setOrder() {

        UserRole customer = new UserRole("customer");
        UserRole worker = new UserRole("Salesman");

        User demo = new User("John", "Doe", "john@doe.com", customer);
        User seller = new User("Mike", "Man", "mikeman@ticketGuru.com", worker);

        this.order = new Order(demo, LocalDate.parse("2024-03-01"), 31.99, true, seller);
    }

    @Test
    public void OrderCreation() {
        assertNotNull(order);
    }
    
    @Test
    public void OrderCustomerName() {
        assertEquals("John", order.getCustomer().getFirstName());
        assertEquals("Doe", order.getCustomer().getLastName());
    }

    @Test 
    public void OrderSellerName() {
        assertEquals("Mike", order.getSeller().getFirstName());
        assertEquals("Man", order.getSeller().getLastName());
    }

    @Test
    public void OrderCreationDate() {
        assertEquals(LocalDate.parse("2024-03-01"), order.getDate());
    }

    @Test
    public void OrderPrice() {
        assertEquals(31.99, order.getTotalPrice());
    }
}
