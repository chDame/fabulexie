package org.fabulexie.rest.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;

import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.model.rules.PunctuationRule;
import org.fabulexie.rest.controller.model.Conversion;
import org.fabulexie.security.annotation.IsAuthenticated;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebDysController extends AbstractController {

		private final Logger logger = LoggerFactory.getLogger(UserController.class);

		private final String PREVIEW_SRC = "<p><b>Reading</b> is the complex cognitive process of decoding symbols to derive meaning. It is a form of language processing.</p>" + 
			
				"<p>Success in this process is measured as reading comprehension. Reading is a means for language acquisition, communication, and sharing information and ideas. The symbols are typically visual (written or printed) but may be tactile (Braille). Like all languages, it is a complex interaction between text and reader, shaped by prior knowledge, experiences, attitude, and the language community—which is culturally and socially situated. Readers use a variety of reading strategies to decode (to translate symbols into sounds or visual representations of speech) and comprehend. Readers may use context clues to identify the meaning of unknown words. Readers integrate the words they have read into their existing framework of knowledge or schema.</p>" + 
		
				"<p>Other types of reading are not speech based writing systems, such as music notation or pictograms. The common link is the interpretation of symbols to extract the meaning from the visual notations or tactile signals (as in the case of Braille).</p>" +
				"<p>Letters : abcdefghijklmnopqrstuvwxyz</p>"+
				"<p>Upper letters : ABCDEFGHIJKLMNIOPQRST</p>"+
				"<p>Numbers : 0123456789</p>";
		
		@PostMapping(value = "/preview")
		@IsAuthenticated
		public Conversion convert(@RequestBody UserConfig config) {
			Conversion c = new Conversion();
			c.setStartTime(System.currentTimeMillis());
			try {
				c.setResult(HtmlParser.transformHtml(PREVIEW_SRC, config));
				c.setStatus(true);
				c.setEndTime(System.currentTimeMillis());
				c.setStatusMessage("conversion in "+(c.getEndTime()-c.getStartTime()+" milliseconds"));
			} catch (Exception e) {
				c.setStatus(false);
				c.setEndTime(System.currentTimeMillis());
				c.setStatusMessage("conversion failed in "+(c.getEndTime()-c.getStartTime()+" milliseconds"));
			}
			return c;
		}
		
		@GetMapping(value = "/web/{url}")
		@IsAuthenticated
		public Conversion convert(@PathVariable String url) {
			UserConfig ac = new UserConfig();
			ac.setLetterRules(new ArrayList<>());
			LetterRule bRule = new LetterRule();
			bRule.setLetters(new ArrayList<>());
			bRule.getLetters().add('b');
			bRule.setColor("#FF00FF");
			ac.getLetterRules().add(bRule);
			LetterRule dRule = new LetterRule();
			dRule.setLetters(new ArrayList<>());
			dRule.getLetters().add('d');
			dRule.setColor("#FF0000");
			dRule.setBold(true);
			ac.getLetterRules().add(dRule);
			//ac.getLetterRules().add(new VowelRule());
			ac.getLetterRules().add(new PunctuationRule());
			Conversion c = new Conversion();
			c.setStartTime(System.currentTimeMillis());
			try {
				c.setResult(HtmlParser.transformFromUrl(URLDecoder.decode(url, StandardCharsets.UTF_8.toString()), ac));
				c.setStatus(true);
				c.setEndTime(System.currentTimeMillis());
				c.setStatusMessage("conversion in "+(c.getEndTime()-c.getStartTime()+" milliseconds"));
			} catch (Exception e) {
				c.setStatus(false);
				c.setEndTime(System.currentTimeMillis());
				c.setStatusMessage("conversion failed in "+(c.getEndTime()-c.getStartTime()+" milliseconds"));
			}
			return c;
		}

		@Override
		public Logger getLogger() {
			return logger;
		}
}
