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

import com.example.TicketGuru.domain.Payment;
import com.example.TicketGuru.domain.PaymentRepository;

@RestController

public class RestPaymentController {

    private static final Logger log = LoggerFactory.getLogger(RestEventController.class);

    @Autowired
    private PaymentRepository paymentRepo;

    // GET
    @GetMapping("/payments/{paymentId}")
    Optional<Payment> getPaymentByPaymentId(@PathVariable Long paymentId) {
        log.info("Get payment by ID");
        return paymentRepo.findById(paymentId);
    }

    // GET ALL
    @GetMapping("/payments")
    List<Payment> getAllPayments() {
        log.info("Get all payments");
        return (List<Payment>) paymentRepo.findAll();
    }

    // POST
    @PostMapping("/payments")
    Payment createPayment(@RequestBody Payment newPayment) {
        log.info("Create new payment");
        return paymentRepo.save(newPayment);
    }

    // PUT
    @PutMapping("/payments/{paymentId}")
    Payment editPayment(@RequestBody Payment editedPayment, @PathVariable Long paymentId) {
        log.info("Edit payment by ID");
        return paymentRepo.save(editedPayment);
    }

    // DELETE
    @DeleteMapping("/payments/{paymentId}")
    ResponseEntity<String> deletePayment(@PathVariable Long paymentId) {
        if (paymentRepo.findById(paymentId).isEmpty()) {
            log.info("No such payment");
            return ResponseEntity.notFound().build();
        }
        log.info("Deleting payment by id");
        paymentRepo.deleteById(paymentId);
        return ResponseEntity.ok("Deleted payment");
    }
}

    
