package com.example.TicketGuru.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "TG_PostalCode")
public class PostalCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PostalCode_id")
    // @NotNull
    private Long Id;

    @Column(name = "PostalCode")
    private String postalCode;

    @Column(name = "City")
    @NotBlank
    private String city;

    @Column(name = "Country")
    private String country;

    public PostalCode() {
        super();
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public PostalCode(Long id, String postalCode, String city, String country) {
        Id = id;
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }

    public PostalCode(String postalCode, String city, String country) {
        this.postalCode = postalCode;
        this.city = city;
        this.country = country;
    }

    @Override
    public String toString() {
        return "Postal [Id=" + Id + ", postalCode=" + postalCode + ", city=" + city + ", country=" + country + "]";
    }
}
