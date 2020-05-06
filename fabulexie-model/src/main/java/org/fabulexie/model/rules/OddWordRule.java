package org.fabulexie.model.rules;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fabulexie.model.rules.base.Rule;

@Entity
public class OddWordRule extends Rule {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
