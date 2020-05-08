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
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebDysController extends AbstractController {

		private final Logger logger = LoggerFactory.getLogger(UserController.class);

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
