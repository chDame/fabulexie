/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at

 * http://www.apache.org/licenses/LICENSE-2.0

 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.fabulexie.core.utils;

import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.model.rules.base.Rule;

/**
 * @author christophe.dame
 */
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
	
	public static String apply(String text, LetterRule rule, int index) {
		String span = "<span class='letterRule"+index+"'>";//getStyledSpan(rule);
		for(Character e : rule.getLetters()) {
			text = text.replace(String.valueOf(e), "¤¤¤"+e+"¤¤");
		}
		text = text.replace("¤¤¤", span);
		text = text.replace("¤¤", "</span>");
		return "<span>"+text+"</span>";
	}
	
	public static String getStyledClass(Rule rule, int index) {
		
		return getStyledClass(rule, "letterRule"+index);
	}

	public static String getStyledClass(Rule rule, String classname) {
		
		StringBuilder sb = new StringBuilder("."+classname+" {");
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
		sb.append("}");
		return sb.toString();
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
