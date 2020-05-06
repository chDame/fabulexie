package org.fabulexie.model.rules;

import java.util.ArrayList;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class PunctuationRule extends LetterRule {

	public static String puncutationMarks = "?,.;/:!§%*£$€+=})]�_\\-|[('{\"#&<>";

	
	public PunctuationRule() {
		super();
		setLetters(new ArrayList<Character>());
		for (char ch : puncutationMarks.toCharArray()) { 
			getLetters().add(ch);
		}
		
		setColor("#00FF00");
		setBold(true);
	}

}
