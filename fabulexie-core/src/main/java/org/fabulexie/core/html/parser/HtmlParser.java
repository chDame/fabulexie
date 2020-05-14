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
import org.jsoup.select.Elements;

/**
 * @author christophe.dame
 */
public class HtmlParser {

	public static String transformFromUrl(String url, UserConfig ac) throws IOException {
		Document doc = Jsoup.connect(url).get();
		// doc.charset(Charset.forName("UTF-8"));
		return transform(doc, ac);
	}

	public static String transformHtml(String html, UserConfig ac) {
		Document doc = Jsoup.parse(html);
		return transform(doc, ac);
	}
	
	public static String transform(Document doc, UserConfig ac) {
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
		for (LetterRule rule : ac.getLetterRules()) {
			applyRules(doc, rule);
		}
	
		
		return doc.html();
	}

	private static void applyRules(Element paragraph, LetterRule rule) {
		List<Node> nodes = paragraph.childNodes();

		for (int i = 0; i < nodes.size(); i++) {
			Node node = nodes.get(i);

			if (node instanceof TextNode && !((TextNode) node).isBlank()) {
				applyRulesToTextNode((TextNode) node, rule);
				// Element parsedBloc = Jsoup.parse(RulesUtils."<span>"+((TextNode)
				// node).text().replace("b", "<b>b</b>")+"</span>", "", Parser.xmlParser());

				// node.replaceWith(parsedBloc);
			} else if (node instanceof Element) {
				applyRules((Element) node, rule);
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
