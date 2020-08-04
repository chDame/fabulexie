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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.List;

import javax.xml.bind.JAXBException;

import org.docx4j.Docx4J;
import org.docx4j.Docx4jProperties;
import org.docx4j.convert.in.xhtml.XHTMLImporterImpl;
import org.docx4j.convert.out.HTMLSettings;
import org.docx4j.jaxb.Context;
import org.docx4j.model.structure.SectionWrapper;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.docx4j.openpackaging.exceptions.InvalidFormatException;
import org.docx4j.openpackaging.packages.WordprocessingMLPackage;
import org.docx4j.openpackaging.parts.WordprocessingML.FooterPart;
import org.docx4j.openpackaging.parts.WordprocessingML.MainDocumentPart;
import org.docx4j.relationships.Relationship;
import org.docx4j.wml.BooleanDefaultTrue;
import org.docx4j.wml.CTShd;
import org.docx4j.wml.Color;
import org.docx4j.wml.FldChar;
import org.docx4j.wml.FooterReference;
import org.docx4j.wml.Ftr;
import org.docx4j.wml.HdrFtrRef;
import org.docx4j.wml.Jc;
import org.docx4j.wml.JcEnumeration;
import org.docx4j.wml.ObjectFactory;
import org.docx4j.wml.P;
import org.docx4j.wml.PPr;
import org.docx4j.wml.R;
import org.docx4j.wml.RPr;
import org.docx4j.wml.STFldCharType;
import org.docx4j.wml.STShd;
import org.docx4j.wml.SectPr;
import org.docx4j.wml.Style;
import org.docx4j.wml.Style.Name;
import org.docx4j.wml.Styles;
import org.docx4j.wml.Text;
import org.docx4j.wml.U;
import org.docx4j.wml.UnderlineEnumeration;
import org.fabulexie.core.exception.ConversionException;
import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.model.rules.base.Rule;



/**
 * @author christophe.dame
 */
public class DocxConverter {
	
	public static void convertDocxToHtml(File docxFile, File htmlFile) throws ConversionException {
		try {
			Docx4jProperties.setProperty("docx4j.Convert.Out.HTML.OutputMethodXML", true);
	    	
			WordprocessingMLPackage wordMLPackage = WordprocessingMLPackage.load(docxFile);
			
			HTMLSettings htmlSettings = Docx4J.createHTMLSettings();
	    	htmlSettings.setWmlPackage(wordMLPackage);
	    	htmlSettings.setImageDirPath("");
	    	htmlSettings.setImageTargetUri("");
	    	
			OutputStream os = new java.io.FileOutputStream(htmlFile);
			
			Docx4J.toHTML(htmlSettings, os, Docx4J.FLAG_NONE);	
			os.close();
		} catch (Docx4JException | IOException e) {
			throw new ConversionException("Error converting docx document to html", e);
		}
	}
	
	public static File adaptDocument(Path htmlOriginal, Path docOriginal, UserConfig ac) throws ConversionException {
		try {
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
			ObjectFactory factory = Context.getWmlObjectFactory();
            
	        XHTMLImporterImpl xHTMLImporter = new XHTMLImporterImpl(docxOut);
			
			docxOut.getMainDocumentPart().getContent().addAll(xHTMLImporter.convert(adaptedHtml, ""));
			

			//footer with paging
			Relationship  relationship = createFooterPageNumPart(docxOut, docxOut.getMainDocumentPart(), factory);  
			createFooter(docxOut, docxOut.getMainDocumentPart(), factory, relationship);  
			//end paging
			File result = targetPath.toFile();

            docxOut.save(result, Docx4J.FLAG_NONE);

			return result;
		} catch (Docx4JException | IOException | JAXBException e) {
			throw new ConversionException("Error adapting docx document", e);
		} catch (Exception e) {
			throw new ConversionException("Error adapting docx document", e);
		}
	}
	
	private static Styles completeStyles(Styles styles, UserConfig ac) {

		int i=0;
		for(LetterRule rule : ac.getLetterRules()) {
			Style style = createStyle(rule, "letterRule"+i);

			style.getName().setParent(styles);
			style.setParent(styles.getStyle());
			styles.getStyle().add(style);
			i++;
		}
		if (ac.getSyllabeRule()!=null && ac.getSyllabeRule().getEnabled()) {
			Style style = createStyle(ac.getSyllabeRule(), "separator");
	
			style.getName().setParent(styles);
			style.setParent(styles.getStyle());
			styles.getStyle().add(style);
		}
		return styles;
	}
	
	private static Style createStyle(Rule rule, String name) {
		Style style = new Style();
		style.setType("character");
		style.setStyleId(name);
		style.setName(new Name());
		style.getName().setVal(name);
	
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
		style.setCustomStyle(true);
		return style;
	}
	
	private static Relationship createFooterPageNumPart(  
            WordprocessingMLPackage wordprocessingMLPackage,  
            MainDocumentPart t, ObjectFactory factory) throws InvalidFormatException {  
        FooterPart footerPart = new FooterPart();  
        footerPart.setPackage(wordprocessingMLPackage);  
        footerPart.setJaxbElement(createFooterWithPageNr(factory));  
        return t.addTargetPart(footerPart);  
    }
	
	private static Ftr createFooterWithPageNr(ObjectFactory factory) {  
        Ftr ftr = factory.createFtr();  
        
        P pageNumParagraph = factory.createP();
        addFieldBegin(factory, pageNumParagraph);
        addPageNumberField(factory, pageNumParagraph);
        addFieldEnd(factory, pageNumParagraph);
        
        ftr.getContent().add(pageNumParagraph);  
        return ftr;  
    }  
	
    private static void createFooter(  
            WordprocessingMLPackage wordprocessingMLPackage,  
            MainDocumentPart t, ObjectFactory factory, Relationship relationship)  
            throws InvalidFormatException {  
        List<SectionWrapper> sections = wordprocessingMLPackage  
                .getDocumentModel().getSections();  
        SectPr sectPr = sections.get(sections.size() - 1).getSectPr();  
        // There is always a section wrapper, but it might not contain a sectPr  
        if (sectPr == null) {  
            sectPr = factory.createSectPr();  
            t.addObject(sectPr);  
            sections.get(sections.size() - 1).setSectPr(sectPr);  
        }  
        FooterReference footerReference = factory.createFooterReference();  
        footerReference.setId(relationship.getId());  
        footerReference.setType(HdrFtrRef.DEFAULT);  
        sectPr.getEGHdrFtrReferences().add(footerReference);  
    } 
	
	private static void addPageNumberField(ObjectFactory factory, P paragraph) {
        R run = factory.createR();
        PPr ppr = new PPr();
        Jc jc = new Jc();
        jc.setVal(JcEnumeration.RIGHT);
        ppr.setJc(jc);
        paragraph.setPPr(ppr);
        Text txt = new Text();
        txt.setSpace("preserve");
        txt.setValue(" PAGE   \\* MERGEFORMAT ");
        run.getContent().add(factory.createRInstrText(txt));
        paragraph.getContent().add(run);

    }

    private static void addFieldBegin(ObjectFactory factory, P paragraph) {  
        R run = factory.createR();  
        FldChar fldchar = factory.createFldChar();  
        fldchar.setFldCharType(STFldCharType.BEGIN);  
        run.getContent().add(fldchar);  
        paragraph.getContent().add(run);  
    }  
  
    private static void addFieldEnd(ObjectFactory factory, P paragraph) {  
        FldChar fldcharend = factory.createFldChar();  
        fldcharend.setFldCharType(STFldCharType.END);  
        R run3 = factory.createR();  
        run3.getContent().add(fldcharend);  
        paragraph.getContent().add(run3);  
    }
	

}
