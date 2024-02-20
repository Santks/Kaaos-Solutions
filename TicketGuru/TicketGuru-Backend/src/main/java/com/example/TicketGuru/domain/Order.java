package com.example.TicketGuru.domain;

import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TG_Order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_id")
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "Customer_id")
    private User customer;

    @Column(name = "Date")
    private Date date;

    @Column(name = "TotalPrice")
    private double totalPrice;

    @Column(name = "OrderPaid")
    private boolean orderPaid;

    @ManyToOne
    @JoinColumn(name = "Seller_id", referencedColumnName = "User_id")
    private User seller;

    // Constructors, getters, setters and toString()

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public boolean isOrderPaid() {
        return orderPaid;
    }

    public void setOrderPaid(boolean orderPaid) {
        this.orderPaid = orderPaid;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public Order(Long orderId, User customer, Date date, double totalPrice, boolean orderPaid,
            User seller) {
        this.orderId = orderId;
        this.customer = customer;
        this.date = date;
        this.totalPrice = totalPrice;
        this.orderPaid = orderPaid;
        this.seller = seller;
    }

    @Override
    public String toString() {
        return "Order [orderId=" + orderId + ", customer=" + customer + ", date=" + date + ", totalPrice=" + totalPrice
                + ", orderPaid=" + orderPaid + ", seller=" + seller + "]";
    }
}
