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

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;

import javax.xml.bind.JAXBException;

import org.docx4j.Docx4J;
import org.docx4j.Docx4jProperties;
import org.docx4j.convert.in.xhtml.XHTMLImporterImpl;
import org.docx4j.convert.out.HTMLSettings;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.wml.BooleanDefaultTrue;
import org.docx4j.wml.CTShd;
import org.docx4j.wml.Color;
import org.docx4j.wml.PPr;
import org.docx4j.wml.RPr;
import org.docx4j.wml.STShd;
import org.docx4j.wml.STThemeColor;
import org.docx4j.wml.Style;
import org.docx4j.wml.Style.Name;
import org.docx4j.wml.Styles;
import org.docx4j.wml.U;
import org.docx4j.wml.UnderlineEnumeration;
import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;

import com.fasterxml.jackson.databind.ObjectMapper;



/**
 * @author christophe.dame
 */
public class DocxParser {
	
	public static void convertDocxToHtml(File docxFile, File htmlFile) throws Docx4JException, IOException {
		Docx4jProperties.setProperty("docx4j.Convert.Out.HTML.OutputMethodXML", true);
    	
		WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docxFile);
		
		HTMLSettings htmlSettings = Docx4J.createHTMLSettings();
    	htmlSettings.setWmlPackage(wordMLPackage);
    	htmlSettings.setImageDirPath("");
    	htmlSettings.setImageTargetUri("");
    	
		OutputStream os = new java.io.FileOutputStream(htmlFile);
		
		Docx4J.toHTML(htmlSettings, os, Docx4J.FLAG_NONE);	
		os.close();
	}
	

	public static File adaptDocument(Path htmlOriginal, Path docOriginal, UserConfig ac) throws Docx4JException, IOException, JAXBException {

		Path targetPath = docOriginal.getParent().resolve("adapted/"+ac.getId()+"/"+ac.getName()+".docx");
		File targetDir = targetPath.getParent().toFile();
		if (!targetDir.exists()) {
			targetDir.mkdirs();
		}
		WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docOriginal.toFile());
		Styles originalStyle = (Styles)wordMLPackage.getMainDocumentPart().getStyleDefinitionsPart().getJaxbElement();

		String adaptedHtml = HtmlParser.transformFromFile(htmlOriginal, ac).html();
		WordprocessingMLPackage docxOut = WordprocessingMLPackage.createPackage();
		Styles styleCopy = new Styles();
		styleCopy.getStyle().addAll(originalStyle.getStyle());

		completeStyles(styleCopy, ac);
		
        docxOut.getMainDocumentPart().getStyleDefinitionsPart().createBinderAndJaxbElement(styleCopy);
		XHTMLImporterImpl xHTMLImporter = new XHTMLImporterImpl(docxOut);
		
		//xHTMLImporter.setParagraphFormatting(FormattingOption.CLASS_PLUS_OTHER);
        
		docxOut.getMainDocumentPart().getContent().addAll(xHTMLImporter.convert(adaptedHtml, ""));
		File result = targetPath.toFile();
		docxOut.save(result, Docx4J.FLAG_NONE);
		return result;
	}
	
	private static Styles completeStyles(Styles styles, UserConfig ac) {
		/**
		 * test
		 */
		int i=0;
		for(LetterRule rule : ac.getLetterRules()) {
			Style style = new Style();
			style.setType("character");
			style.setStyleId("letterRule"+i);
			style.setName(new Name());
			style.getName().setVal("letterRule"+i);
			style.getName().setParent(styles);
		
			style.setRPr(new RPr());
			if (rule.isBold()) {
				style.getRPr().setB(new BooleanDefaultTrue());
			}
			if (rule.isUnderlined()) {
				style.getRPr().setU(new U());
				style.getRPr().getU().setVal(UnderlineEnumeration.SINGLE);
			}
			if (rule.isItalic()) {
				style.getRPr().setI(new BooleanDefaultTrue());
			}
			if (rule.isUpperCase()) {
				style.getRPr().setCaps(new BooleanDefaultTrue());
			}
			if (rule.getColor()!=null) {
				style.getRPr().setColor(new Color());
				style.getRPr().getColor().setVal(rule.getColor().substring(1));
			}
			if (rule.getBackgroundColor()!=null) {
				style.getRPr().setShd(new CTShd());
				style.getRPr().getShd().setVal(STShd.CLEAR);
				style.getRPr().getShd().setColor("auto");
				style.getRPr().getShd().setFill(rule.getBackgroundColor().substring(1));
			}
			style.setParent(styles.getStyle());
			style.setCustomStyle(true);
			styles.getStyle().add(style);
			i++;
		}
		return styles;
	}

}
