package org.fabulexie.model.rules;

import java.util.ArrayList;

public class UppercaseRule extends LetterRule {

	public UppercaseRule() {
		super();
		setLetters(new ArrayList<Character>());
		for (char ch = 'A'; ch <= 'Z'; ch++) { 
			getLetters().add(ch);
		}
		
		setColor("#FF0000");
		setBold(true);
	}
	
}
