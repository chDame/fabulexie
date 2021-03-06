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
package org.fabulexie.core.html.parser;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.TreeSet;

import org.fabulexie.core.utils.RulesUtils;
import org.fabulexie.core.utils.SyllabeUtils;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Entities.EscapeMode;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.parser.Parser;
import org.jsoup.select.Elements;

/**
 * @author christophe.dame
 */
public class HtmlParser {
	
	public static String clean(String html) {
		Document doc = Jsoup.parse(html);
		doc.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
		doc.outputSettings().escapeMode(EscapeMode.xhtml); //This will ensure the validity
		doc.outputSettings().charset("UTF-8");
		doc.outputSettings().prettyPrint(false);
		doc.outputSettings().indentAmount(0);
		Elements pages = doc.body().select("div.pagedjs_page");
		pages.attr("style", "display:none");
		Elements elts = doc.head().getElementsByTag("style");
		String styles = "";
		for(int i=0; i < elts.size(); i++) {
			styles+=elts.get(i).html().replace("&lt;!--", "<!--").replace("--&gt;", "-->");
		}
		elts.remove();
		doc.head().append("<style>"+styles+"</style>");
		return doc.html();
	}
 
	public static String transformFromUrl(String url, UserConfig ac) throws IOException {
		Document doc = Jsoup.connect(url).get();
		// doc.charset(Charset.forName("UTF-8"));
		return transformToHtml(doc, ac);
	}

	public static String transformHtml(String html, UserConfig ac, boolean relink) {
		Document doc = Jsoup.parse(html);
		return transformToHtml(doc, ac, relink, null, null);
	}
	
	public static String transformHtml(String html, UserConfig ac, Double width, Double height) {
		Document doc = Jsoup.parse(html);
		return transformToHtml(doc, ac, false, width, height);
	}
	
	public static void transformFromFile(Path sourceFile, Path targetFile, UserConfig ac) throws IOException {
		Document doc = transformFromFile(sourceFile, ac);
		try(FileOutputStream os = new FileOutputStream(targetFile.toFile())) {
			os.write(doc.html().getBytes());
		}
	}
	
	public static Document transformFromFile(Path filePath, UserConfig ac) throws IOException {
		Document doc = Jsoup.parse(filePath.toFile(), "UTF-8");
		doc.outputSettings().syntax( Document.OutputSettings.Syntax.xml);
		return transformToDoc(doc, ac, false, null, null);
	}
	
	public static String transformToHtml(Document doc, UserConfig ac) {
		return transformToDoc(doc, ac).html();
	}
	public static String transformToHtml(Document doc, UserConfig ac, boolean relink, Double width, Double height) {
		return transformToDoc(doc, ac, relink, width, height).html();
	}
	public static Document transformToDoc(Document doc, UserConfig ac) {
		return transformToDoc(doc, ac, true, null, null);
	}
	public static Document transformToDoc(Document doc, UserConfig ac, boolean relink, Double width, Double height) {
		if (relink) {
			Elements imports = doc.head().select("link[href]");
			for (Element elImport : imports) {
				elImport.attr("href", elImport.absUrl("href"));
			}
			Elements imgs = doc.body().select("img[src]");
			for (Element img : imgs) {
				 img.attr("src", img.absUrl("src"));
				 
			}
			Elements links = doc.body().select("a[href]");
			for (Element link : links) {
				link.attr("href", link.absUrl("href"));
			}
		} 
		if (width!=null && height!=null){
			//pure html to be displayed
			Elements imgs = doc.body().select("img");
			imgs.attr("style", "max-width:"+width+"px;max-height:"+height+"px;");
		}
		if (ac.getExtraLineSpace()!=null && ac.getExtraLineSpace()>0) {
			//if lineHeight should be increased, existing notations should be removed
			Elements elts = doc.head().getElementsByTag("style");
			String styles = "";
			for(int i=0; i < elts.size(); i++) {
				styles+=elts.get(i).html().replaceAll("(line-height\\:[\\s]*[0-9]+[^;]*)([;}])", "$2");
			}
			elts.remove();
			doc.head().append("<style>"+styles+"</style>");
			doc.head().append("<style>html, body { line-height: "+(ac.getExtraLineSpace()+1)+"00%;}</style>");
		}

	
		StringBuffer customStyles = new StringBuffer("<style><!-- ");
		if (ac.isSyllabe()) {
			customStyles.append(RulesUtils.getStyledClass(ac.getEvenSyllabeRule(), "syllabe0"));
			customStyles.append(RulesUtils.getStyledClass(ac.getOddSyllabeRule(), "syllabe1"));
			doc = applySyllabes(doc, ac);
		}
		
		int i=0;
		for (LetterRule rule : ac.getLetterRules()) {
			customStyles.append(RulesUtils.getStyledClass(rule, i));
			applyRules(doc, rule, i++);
		}
		
		if (ac.getExtraWordSpace()!=null && ac.getExtraWordSpace()>0) {
			customStyles.append("html, body { word-spacing: "+ac.getExtraWordSpace()+"em; }");
		}
		customStyles.append("--></style>");
		
		doc.head().append(customStyles.toString());
		
		return doc;
	}

	private static void applyRules(Element paragraph, LetterRule rule, int index) {
		List<Node> nodes = paragraph.childNodes();

		for (int i = 0; i < nodes.size(); i++) {
			Node node = nodes.get(i);

			if (node instanceof TextNode && !((TextNode) node).isBlank()) {
				applyRulesToTextNode((TextNode) node, rule, index);
				// Element parsedBloc = Jsoup.parse(RulesUtils."<span>"+((TextNode)
				// node).text().replace("b", "<b>b</b>")+"</span>", "", Parser.xmlParser());

				// node.replaceWith(parsedBloc);
			} else if (node instanceof Element) {
				applyRules((Element) node, rule, index);
			}
		}
	}

	private static void applyRulesToTextNode(TextNode node, LetterRule rule, int index) {
		String text = ((TextNode) node).text();

		if (RulesUtils.isApplicable(text, rule)) {
			Node parsedBloc = Jsoup.parse(RulesUtils.apply(text, rule, index), "", Parser.xmlParser());
			node.replaceWith(parsedBloc.childNode(0));
		}
	}
	
	private static Document applySyllabes(Document doc, UserConfig uc) {
		//prepare separator
		//String separator = "<span class='separator'>"+uc.getSyllabeRule().getSeparator()+"</span>";
		//compute syllabes indexes
		String bruteText = doc.text();
		TreeSet<Integer> syllabeSeparator = new TreeSet<>();

		for(int i=bruteText.length()-4; i>+0;) {
			String search = bruteText.substring(i, i+4);
			int sep = SyllabeUtils.cachedCeisure(search);
			if (sep>0) {
				syllabeSeparator.add(i+sep);
				i--;
			} else {
				i--;
			}
		}

		applySyllabes(doc, syllabeSeparator, 0, bruteText);
		String htmlDraft = doc.outerHtml();
		//start word
		htmlDraft = htmlDraft.replaceAll("([^\\p{L}^¤^']{1})([\\p{L}']+)¤¤", "$1<span class=\"syllabe\">$2¤¤");
		//very first word
		htmlDraft = htmlDraft.replaceFirst("^([\\p{L}']+)¤¤", "<span class=\"syllabe\">$1¤¤");
		
		//end word
		htmlDraft = htmlDraft.replaceAll("¤¤([\\p{L}']+)([^\\p{L}^¤^']{1})", "¤¤$1</span>$2");
		//very last word
		htmlDraft = htmlDraft.replaceFirst("¤¤([\\p{L}']+)$", "¤¤$1</span>");
		
		//other elements
		htmlDraft = htmlDraft.replace("¤¤", "</span><span class=\"syllabe\">");
		
		//mark odd and even directly with a number
		htmlDraft = htmlDraft.replaceAll("(span class=\\\"syllabe)(((?!span class=\\\"syllabe).)+)(span class=\\\"syllabe)", "$10$2$41");
		
		//Document newDoc = Jsoup.parse(doc.outerHtml().replace("¤¤", separator));
		Document newDoc = Jsoup.parse(htmlDraft);
		newDoc.outputSettings().syntax( Document.OutputSettings.Syntax.xml);
		return newDoc;
	}
	
	private static int applySyllabes(Element paragraph, TreeSet<Integer> syllabeSeparator, int idx, String simpleText) {
		List<Node> nodes = paragraph.childNodes();
	
		for (int i = 0; i < nodes.size() && !syllabeSeparator.isEmpty(); i++) {
			Node node = nodes.get(i);
			
			if (node instanceof TextNode && !((TextNode) node).isBlank() && !((TextNode) node).text().trim().isEmpty()) {
				idx = applySyllabesToTextNode((TextNode) node, syllabeSeparator, idx, simpleText);
				
			} else if (node instanceof Element) {
				idx = applySyllabes((Element) node, syllabeSeparator, idx, simpleText);
			}
		}
		return idx;
	}

	private static int applySyllabesToTextNode(TextNode node, TreeSet<Integer> syllabeSeparator, int idx, String simpleText) {
		String text = ((TextNode) node).text();
		//resynchro after empty lines
		if (text.charAt(0)!=simpleText.charAt(idx)) {
			idx = simpleText.indexOf(text.charAt(0), idx);
		}
		int length = text.length();
		int endNode = idx + length;
		int sep = syllabeSeparator.first();
		int added = 0;
		while (sep>=idx && sep <endNode) {
			text = text.substring(0, sep+added-idx) + "¤¤" + text.substring(sep+added-idx);
			added+=2;
			node.text(text);
			syllabeSeparator.pollFirst();
			if (!syllabeSeparator.isEmpty()) {
				sep  = syllabeSeparator.first();
			} else {
				sep = -1;
			}
		}
		return endNode;
	}
}
