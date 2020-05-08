package org.fabulexie.core.html.parser;

import java.io.IOException;
import java.util.List;

import org.fabulexie.core.utils.RulesUtils;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.nodes.Node;
import org.jsoup.nodes.TextNode;
import org.jsoup.parser.Parser;

public class HtmlParser {
	
	public static String transformFromUrl(String url, UserConfig ac) throws IOException {
		Document doc = Jsoup.connect(url).get();
		//doc.charset(Charset.forName("UTF-8"));
		return transform(doc, ac);
	}
	
	public static String transformHtml(String html, UserConfig ac) {
		Document doc = Jsoup.parse(html);
		return transform(doc, ac);
	}
	

	public static String transform(Document doc, UserConfig ac) {
		for(LetterRule rule : ac.getLetterRules()) {
			applyRules(doc, rule);
		}
		return doc.html();
	}
	
	
	private static void applyRules(Element paragraph, LetterRule rule) {
		List<Node> nodes = paragraph.childNodes();

		for(int i=0;i<nodes.size();i++) {
			Node node = nodes.get(i);

			if (node instanceof TextNode && !((TextNode) node).isBlank()) {
				applyRulesToTextNode((TextNode) node, rule);
				//Element parsedBloc = Jsoup.parse(RulesUtils."<span>"+((TextNode) node).text().replace("b", "<b>b</b>")+"</span>", "", Parser.xmlParser());
				
				//node.replaceWith(parsedBloc);
			} else if (node instanceof Element) {
				applyRules((Element)node, rule);
			} 
		}
	}
	
	private static void applyRulesToTextNode(TextNode node, LetterRule rule) {
		String text = ((TextNode) node).text();
		
		if (RulesUtils.isApplicable(text, rule)) {
			Node parsedBloc = Jsoup.parse(RulesUtils.apply(text, rule), "", Parser.xmlParser());
			node.replaceWith(parsedBloc.childNode(0));
		}
	}
}
