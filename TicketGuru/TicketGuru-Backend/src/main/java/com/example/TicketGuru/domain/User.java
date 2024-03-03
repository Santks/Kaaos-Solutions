package com.example.TicketGuru.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TG_User")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // generaatio tapa?
	@Column(name = "User_id", nullable = false)
	private Long userId;

	@Column(name = "FirstName", nullable = false)
	private String firstName;

	@Column(name = "LastName", nullable = false)
	private String lastName;

	@Column(name = "Phone")

	private String phone;
	@Column(name = "Email", nullable = false)
	private String email;

	@Column(name = "Address")
	private String address;

	@Column
	private boolean activeUser;

	@ManyToOne
	@JoinColumn(name = "PostalCode")
	private PostalCode postalCode;

	@ManyToOne
	@JoinColumn(name = "userRoleId")
	private UserRole userRole;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isActiveUser() {
		return activeUser;
	}

	public void setActiveUser(boolean activeUser) {
		this.activeUser = activeUser;
	}

	public PostalCode getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(PostalCode postalCode) {
		this.postalCode = postalCode;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public User(Long userId, String firstName, String lastName, String phone, String email, String address,
			UserRole userRole, boolean activeUser) {
		super();
		this.userId = userId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.userRole = userRole;
		this.activeUser = activeUser;

	}
	
	public User(Long userId, UserRole userRole) {
		this.userId = userId;
		this.userRole = userRole;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", phone=" + phone
				+ ", email=" + email + ", address=" + address + ", activeUser=" + activeUser + ", postalCode="
				+ postalCode + ", userRole=" + userRole + "]";
	}
	

}