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
package org.fabulexie.core.utils.docx;

import static org.assertj.core.api.Assertions.assertThat;

import java.io.File;
import java.net.URISyntaxException;
import java.nio.file.Path;

import org.apache.commons.compress.utils.Sets;
import org.fabulexie.core.exception.ConversionException;
import org.fabulexie.core.utils.PdfConverter;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.junit.jupiter.api.Test;

import com.google.common.collect.Lists;

/**
 * @author christophe.dame
 */
public class PdfConverterTests {

	private Path getPath(String file) throws URISyntaxException {
		return new File(this.getClass().getClassLoader().getResource(file).toURI()).toPath();
	}
	
	@Test
	public void adaptDocumentTest() throws URISyntaxException, ConversionException {
		UserConfig uc = new UserConfig();
		LetterRule lr = new LetterRule();
		lr.setBold(true);
		lr.setColor("#0033CC");
		lr.setBackgroundColor("#FF6600");
		lr.setUpperCase(true);
		lr.setUnderlined(true);
		lr.setItalic(true);
		lr.setLetters(Sets.newHashSet('e'));
		uc.setLetterRules(Lists.newArrayList(lr));
		
		File f = PdfConverter.adaptDocument(getPath("cyrano.html"), getPath("./"), uc);
		assertThat(f).isNotNull();
	}
	
	
	
}
