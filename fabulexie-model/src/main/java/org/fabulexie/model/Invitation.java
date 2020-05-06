package org.fabulexie.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Invitation extends BaseEntity<Long> {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	private String email;
	private String code;
	private Date emission;
	private boolean confirmed;
	private Boolean realtor;
	private Boolean admin;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public void setConfirmed(boolean confirmed) {
		this.confirmed = confirmed;
	}
	public Date getEmission() {
		return emission;
	}
	public void setEmission(Date emission) {
		this.emission = emission;
	}
	public boolean isConfirmed() {
		return confirmed;
	}
	public Boolean getRealtor() {
		return realtor;
	}
	public void setRealtor(Boolean realtor) {
		this.realtor = realtor;
	}
	public Boolean getAdmin() {
		return admin;
	}
	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}
}
