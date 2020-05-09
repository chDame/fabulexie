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

@Entity
public class UserConfig extends BaseEntity<Long> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	
	private String name;
	
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
}
