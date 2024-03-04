package com.example.TicketGuru.web;

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
        return paymentRepo.findById(paymentId);
    }

    // POST
    @PostMapping("/payments")
    Payment createPayment(@RequestBody Payment newPayment) {
        return paymentRepo.save(newPayment);
    }

    // PUT
    @PutMapping("/payments/{paymentId}")
    Payment editPayment(@RequestBody Payment editedPayment, @PathVariable Long paymentId) {
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

    
