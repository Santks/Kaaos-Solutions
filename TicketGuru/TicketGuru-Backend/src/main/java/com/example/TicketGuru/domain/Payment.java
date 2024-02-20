package com.example.TicketGuru.domain;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TG_Payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Payment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Customer_id")
    private User user;

    @OneToOne
    @JoinColumn(name = "Order_id")
    private Order order;

    @Column(name = "Amount")
    private Double amount;

    @Column(name = "PaymentDate")
    private Date paymentDate;

    @Column(name = "PaymentMethod")
    private String paymentMethod;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(Date paymentDate) {
        this.paymentDate = paymentDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Payment(Long id, User user, Order order, Double amount, Date paymentDate, String paymentMethod) {
        this.id = id;
        this.user = user;
        this.order = order;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.paymentMethod = paymentMethod;
    }

    @Override
    public String toString() {
        return "Payment [id=" + id + ", user=" + user + ", order=" + order + ", amount=" + amount
                + ", paymentDate=" + paymentDate + ", paymentMethod=" + paymentMethod + "]";
    }
}