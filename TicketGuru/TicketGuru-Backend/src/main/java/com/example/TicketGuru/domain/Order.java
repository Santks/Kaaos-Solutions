package com.example.TicketGuru.domain;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "TG_Order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_id")
    @NotNull
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "Customer_id")
    @NotNull
    private User customer;

    @Column(name = "Date")
    @NotNull
    private LocalDate date;

    @Column(name = "TotalPrice")
    @NotNull
    private double totalPrice;

    @Column(name = "OrderPaid")
    private boolean orderPaid;

    @ManyToOne
    @JoinColumn(name = "Seller_id", referencedColumnName = "User_id")
    @NotNull
    private User seller;
    
    @OneToMany(mappedBy = "order", cascade=CascadeType.ALL)
	@JsonManagedReference(value="ticket-order")
    private List<Ticket> tickets;
    
    public List<Ticket> getTickets() {
		return tickets;
	}

	public void setTickets(List<Ticket> tickets) {
		this.tickets = tickets;
	}

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
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
    
    public Order() {
    	super();
    }

    public Order(User customer, LocalDate date, double totalPrice, boolean orderPaid,
            User seller) {
    	super();
        this.customer = customer;
        this.date = date;
        this.totalPrice = totalPrice;
        this.orderPaid = orderPaid;
        this.seller = seller;
    }

    public Order(User customer, LocalDate date, double totalPrice, boolean orderPaid,
            User seller, List<Ticket> tickets) {
    	super();
        this.customer = customer;
        this.date = date;
        this.totalPrice = totalPrice;
        this.orderPaid = orderPaid;
        this.seller = seller;
        this.tickets = tickets;
    }
    @Override
    public String toString() {
        return "Order [orderId=" + orderId + ", customer=" + customer + ", date=" + date + ", totalPrice=" + totalPrice
                + ", orderPaid=" + orderPaid + ", seller=" + seller + "]";
    }
}
