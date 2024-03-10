package com.example.TicketGuru.web;

import java.util.List;
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

import com.example.TicketGuru.domain.Payment;
import com.example.TicketGuru.domain.PaymentRepository;

@RestController

public class RestPaymentController {

    private static final Logger log = LoggerFactory.getLogger(RestEventController.class);

    @Autowired
    private PaymentRepository paymentRepo;

    // GET
    @GetMapping("/payments/{paymentId}")
    public ResponseEntity<Payment> getPaymentByPaymentId(@PathVariable Long paymentId) {
        log.info("Get payment by ID");
        Optional<Payment> payment = paymentRepo.findById(paymentId);
        if (payment.isPresent()) {
            return new ResponseEntity<>(payment.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // GET ALL
    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
        log.info("Get all payments");
        return new ResponseEntity<>((List<Payment>) paymentRepo.findAll(), HttpStatus.OK);
    }

    // POST
    @PostMapping("/payments")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment newPayment) {
        log.info("Create new payment");
        if (newPayment.getAmount() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(paymentRepo.save(newPayment), HttpStatus.CREATED);
    }

    // PUT
    @PutMapping("/payments/{paymentId}")
    public ResponseEntity<Payment> editPayment(@RequestBody Payment editedPayment, @PathVariable Long paymentId) {
        log.info("Edit payment by ID");
        if (editedPayment.getAmount() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        editedPayment.setId(paymentId);
        return new ResponseEntity<>(paymentRepo.save(editedPayment), HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/payments/{paymentId}")
    public ResponseEntity<String> deletePayment(@PathVariable Long paymentId) {
        log.info("Deleting payment by id");
        if (paymentRepo.findById(paymentId).isEmpty()) {
            log.info("No such payment");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        paymentRepo.deleteById(paymentId);
        return new ResponseEntity<>("Deleted payment", HttpStatus.OK);
    }
}

    
