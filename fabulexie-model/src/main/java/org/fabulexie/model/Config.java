package org.fabulexie.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

@Entity
public class Config extends BaseEntity<Long> {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	private String googleClientId;
	private String faceBookAppId;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String faceBookAppSecret;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getGoogleClientId() {
		return googleClientId;
	}
	public void setGoogleClientId(String googleClientId) {
		this.googleClientId = googleClientId;
	}
	public String getFaceBookAppId() {
		return faceBookAppId;
	}
	public void setFaceBookAppId(String faceBookAppId) {
		this.faceBookAppId = faceBookAppId;
	}
	public String getFaceBookAppSecret() {
		return faceBookAppSecret;
	}
	public void setFaceBookAppSecret(String faceBookAppSecret) {
		this.faceBookAppSecret = faceBookAppSecret;
	}
			
	
}
