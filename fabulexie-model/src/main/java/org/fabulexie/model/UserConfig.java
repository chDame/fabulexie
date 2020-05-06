package org.fabulexie.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.fabulexie.model.rules.LetterRule;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class UserConfig extends BaseEntity<Long> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

	@OneToMany(mappedBy="config",fetch = FetchType.EAGER)
    private List<LetterRule> letterRules;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<LetterRule> getLetterRules() {
		return letterRules;
	}

	public void setLetterRules(List<LetterRule> letterRules) {
		this.letterRules = letterRules;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
