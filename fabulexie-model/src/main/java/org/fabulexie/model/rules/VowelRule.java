package org.fabulexie.model.rules;

import java.util.ArrayList;

public class VowelRule extends LetterRule {

	public VowelRule() {
		super();
		setLetters(new ArrayList<Character>());
		getLetters().add('a');
		getLetters().add('e');
		getLetters().add('i');
		getLetters().add('o');
		getLetters().add('u');
		
		setColor("#996600");
		setItalic(true);
	}
	
}
