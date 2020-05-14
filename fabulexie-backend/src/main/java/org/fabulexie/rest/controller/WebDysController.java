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
package org.fabulexie.rest.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.rest.controller.model.Conversion;
import org.fabulexie.security.annotation.IsAuthenticated;
import org.fabulexie.service.UserService;
import org.fabulexie.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
public class WebDysController extends AbstractController {

		private final Logger logger = LoggerFactory.getLogger(UserController.class);

		private final String PREVIEW_SRC = "<p><b>Reading</b> is the complex cognitive process of decoding symbols to derive meaning. It is a form of language processing.</p>" + 
			
				"<p>Success in this process is measured as reading comprehension. Reading is a means for language acquisition, communication, and sharing information and ideas. The symbols are typically visual (written or printed) but may be tactile (Braille). Like all languages, it is a complex interaction between text and reader, shaped by prior knowledge, experiences, attitude, and the language community which is culturally and socially situated. Readers use a variety of reading strategies to decode (to translate symbols into sounds or visual representations of speech) and comprehend. Readers may use context clues to identify the meaning of unknown words. Readers integrate the words they have read into their existing framework of knowledge or schema.</p>" + 
		
				"<p>Other types of reading are not speech based writing systems, such as music notation or pictograms. The common link is the interpretation of symbols to extract the meaning from the visual notations or tactile signals (as in the case of Braille).</p>" +
				"<p>Letters : abcdefghijklmnopqrstuvwxyz</p>"+
				"<p>Upper letters : ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>"+
				"<p>Numbers : 0123456789</p>";
		
		@Autowired
		private UserService userService;
		
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
		
		@GetMapping(value = "/web/")
		@IsAuthenticated
		public Conversion convert(@RequestHeader("url") String url) {
			Long userId = SecurityUtils.getConnectedUser().getId();
			User u = userService.getById(userId);
			UserConfig ac = u.getActiveConfig();
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
