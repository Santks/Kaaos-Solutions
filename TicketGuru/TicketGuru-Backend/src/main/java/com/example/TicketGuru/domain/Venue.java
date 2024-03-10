package com.example.TicketGuru.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "TG_Venue")
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Venue_id")
    @NotNull
    private Long id;

    @Column(name = "Name")
    @NotBlank
    private String name;

    @Column(name = "Address")
    @NotBlank
    private String address;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "Email")
    @Email
    private String email;

    @Column(name = "Capacity")
    @NotNull
    private int capacity;

    @ManyToOne
    @JoinColumn(name = "PostalCode")
    private PostalCode postalCode;

    public Venue() {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public PostalCode getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(PostalCode postalCode) {
        this.postalCode = postalCode;
    }

    public Venue(Long id, String name, String address, String phone, String email, int capacity,
            PostalCode postalCode) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.capacity = capacity;
        this.postalCode = postalCode;
    }

    public Venue(String name, String address, String phone, String email, int capacity,
            PostalCode postalCode) {
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.capacity = capacity;
        this.postalCode = postalCode;
    }

    @Override
    public String toString() {
        return "Venue [id=" + id + ", name=" + name + ", address=" + address + ", phone=" + phone + ", email=" + email
                + ", capacity=" + capacity + ", postalCode=" + postalCode + "]";
    }

}