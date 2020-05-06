package org.fabulexie.model.rules;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.fabulexie.model.rules.base.Rule;

@Entity
public class LetterRule extends Rule {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	

	@ElementCollection(targetClass=Character.class)
	private List<Character> letters;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public List<Character> getLetters() {
		return letters;
	}

	public void setLetters(List<Character> letters) {
		this.letters = letters;
	}

	
}
