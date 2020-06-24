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
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.xml.parsers.ParserConfigurationException;

import org.apache.commons.io.IOUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.fabulexie.core.exception.ConversionException;
import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.model.UserConfig;
import org.fit.pdfdom.PDFDomTree;
import org.jsoup.select.Elements;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.ColumnText;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.Pipeline;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFilesImpl;
import com.itextpdf.tool.xml.css.StyleAttrCSSResolver;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.HTML;
import com.itextpdf.tool.xml.html.TagProcessorFactory;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

/**
 * @author christophe.dame
 */
public class PdfConverter {
	
	public void pdfToHtml(File pdfFile, File htmlFile) throws ConversionException {
		try {
			PDDocument pdf = PDDocument.load(pdfFile);
		    Writer output = new PrintWriter(htmlFile, StandardCharsets.UTF_8.displayName());
		    new PDFDomTree().writeText(pdf, output);
		     
		    output.close();
		} catch(ParserConfigurationException | IOException e) {
			throw new ConversionException("Error converting pdf to html", e);
		}
	}
	
	private static void convertHtmlToPdfWithPages(String htmlContent, File pdfTarget) throws ConversionException {
		String temp = pdfTarget.getParent()+ "/tmp_"+pdfTarget.getName();
        htmlToPdf(htmlContent, new File(temp));
		try {
			addPageAndIcon(temp, pdfTarget.getAbsolutePath());
		} catch (IOException | DocumentException e) {
			throw new ConversionException("Error adding pages to pdf", e);
		}
	}
	
	private static void htmlToPdf(String htmlContent, File pdfTarget) throws ConversionException {
	    try {
	        final OutputStream file = new FileOutputStream(pdfTarget);
	        final Document document = new Document(PageSize.A4);
	        document.setMargins(100f, 100f, 50f, 60f);
	        final PdfWriter writer = PdfWriter.getInstance(document, file);
	        document.open();
	        final TagProcessorFactory tagProcessorFactory = Tags.getHtmlTagProcessorFactory();
	        tagProcessorFactory.removeProcessor(HTML.Tag.IMG);
	        tagProcessorFactory.addProcessor(new ImageTagProcessor(), HTML.Tag.IMG);

	        final CssFilesImpl cssFiles = new CssFilesImpl();
	        cssFiles.add(XMLWorkerHelper.getInstance().getDefaultCSS());
	        final StyleAttrCSSResolver cssResolver = new StyleAttrCSSResolver(cssFiles);
	        final HtmlPipelineContext hpc = new HtmlPipelineContext(new CssAppliersImpl(new XMLWorkerFontProvider()));
	        hpc.setAcceptUnknown(true).autoBookmark(true).setTagFactory(tagProcessorFactory);
	        final HtmlPipeline htmlPipeline = new HtmlPipeline(hpc, new PdfWriterPipeline(document, writer));
	        final Pipeline<?> pipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
	        final XMLWorker worker = new XMLWorker(pipeline, true);
	        final Charset charset = Charset.forName("UTF-8");
	        final XMLParser xmlParser = new XMLParser(true, worker, charset);
	        final InputStream is = IOUtils.toInputStream(htmlContent, StandardCharsets.UTF_8);
	        xmlParser.parse(is, charset);
	        is.close();
	        document.close();
	        file.close();
	        worker.close();
	        writer.close();
	    } catch (NullPointerException | DocumentException | IOException e) {
	    	throw new ConversionException("Error converting pdf to html", e);
	    }
	}
	
	private static void addPageAndIcon(String src, String target) throws IOException, DocumentException {
        PdfReader reader = new PdfReader(src);
        Path filePath = Paths.get(src);

        OutputStream output = new FileOutputStream(target);
        int n = reader.getNumberOfPages();
        PdfStamper stamper = new PdfStamper(reader, output);
        PdfContentByte pagecontent;
        Image image = Image.getInstance(PdfConverter.class.getClassLoader().getResource("stamp2.png"));
        image.scaleAbsolute(30, 30);
        image.setAbsolutePosition(15, 800);
        for (int i = 0; i < n; ) {
            pagecontent = stamper.getOverContent(++i);
            ColumnText.showTextAligned(pagecontent, Element.ALIGN_CENTER,
                    new Phrase(String.valueOf(i)), 300, 30, 0);
            
            pagecontent.addImage(image);
        }
        stamper.close();
        reader.close();
        output.close();
        filePath.toFile().delete();
    }
	
	public static File adaptDocument(Path htmlOriginal, Path workingDir, UserConfig ac) throws ConversionException {
		try {
			Path parent = workingDir.resolve("adapted/"+ac.getId());
			Path targetPath = parent.resolve(ac.getName()+".pdf");
			String adaptedHtml;
			org.jsoup.nodes.Document adapted = HtmlParser.transformFromFile(htmlOriginal, ac);
			removeHtmlCommentsFromStyles(adapted);
			
			adaptedHtml = adapted.html();

			if (!parent.toFile().exists()) {
				parent.toFile().mkdirs();
				//result.createNewFile();
			}
			Files.deleteIfExists(targetPath);
			convertHtmlToPdfWithPages(adaptedHtml, targetPath.toFile());
			return targetPath.toFile();
		} catch (IOException e) {
			throw new ConversionException("Error adapting pdf document", e);
		}
	}
	
	private static void removeHtmlCommentsFromStyles(org.jsoup.nodes.Document doc) {
		Elements elts = doc.head().getElementsByTag("style");
		String styles = "";
		for(int i=0; i < elts.size(); i++) {
			styles+=elts.get(i).html().replace("<!--", "").replace("-->", "");
		}
		elts.remove();
		doc.head().append("<style>"+styles+"</style>");
	}
}
