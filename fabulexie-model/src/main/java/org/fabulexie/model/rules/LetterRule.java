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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LetterRule other = (LetterRule) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
