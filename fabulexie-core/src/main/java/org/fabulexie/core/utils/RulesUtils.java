package org.fabulexie.core.utils;

import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.model.rules.base.Rule;

public class RulesUtils {

	private RulesUtils() {
		
	}
	
	public static boolean isApplicable(String text, LetterRule rule) {
		for(char e : rule.getLetters()) {
			if (text.indexOf(e)>=0) {
				return true;
			}
		}
		return false;
	}
	
	public static String apply(String text, LetterRule rule) {
		String span = getStyledSpan(rule);
		for(Character e : rule.getLetters()) {
			text = text.replace(String.valueOf(e), "¤¤¤"+e+"¤¤");
		}
		text = text.replace("¤¤¤", span);
		text = text.replace("¤¤", "</span>");
		return "<span>"+text+"</span>";
	}
	
	public static String getStyledSpan(Rule rule) {
		
		StringBuilder sb = new StringBuilder("<span style='");
		if (rule.getColor()!=null && !rule.getColor().equals("")) {
			sb.append("color:").append(rule.getColor()).append(";");
		}
		if (rule.getBackgroundColor()!=null && !rule.getBackgroundColor().equals("")) {
			sb.append("background:").append(rule.getBackgroundColor()).append(";");
		}
		if (rule.isBold()) {
			sb.append("font-weight: bold;");
		}
		if (rule.isUnderlined()) {
			sb.append("text-decoration: underline;");
		}
		if (rule.isItalic()) {
			sb.append("font-style: italic;");
		}
		if (rule.isUpperCase()) {
			sb.append("text-transform: uppercase;");
		}
		sb.append("'>");
		return sb.toString();
	}
	
}
