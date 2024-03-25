package com.example.TicketGuru.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "TG_UserRole")
public class UserRole {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserRole_id")
	// @NotNull
	private Long userRoleId;

	@Column(name = "Name")
	@NotBlank
	private String userRoleName;

	@Column(name = "Description")
	private String roleDesc;

	@ManyToOne
	@JoinColumn(name = "User_id")
	private User user;

	public Long getUserRoleId() {
		return userRoleId;
	}

	public void setUserRoleId(Long userRoleId) {
		this.userRoleId = userRoleId;
	}

	public String getUserRoleName() {
		return userRoleName;
	}

	public void setUserRoleName(String userRoleName) {
		this.userRoleName = userRoleName;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public UserRole() {
		super();
	}

	public UserRole(String userRoleName) {
		super();
		this.userRoleName = userRoleName;
	}

	@Override
	public String toString() {
		return "UserRole [userRoleId=" + userRoleId + ", userRoleName=" + userRoleName + ", roleDesc=" + roleDesc
				+ ", user=" + user + "]";
	}
}
