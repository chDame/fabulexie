package org.fabulexie.model.rules;

import java.util.ArrayList;

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
