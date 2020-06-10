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

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.JAXBException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.core.utils.docx.DocxParser;
import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.document.Document;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.security.FabulexiePrincipal;
import org.fabulexie.security.annotation.IsAuthenticated;
import org.fabulexie.service.DocumentService;
import org.fabulexie.service.UserService;
import org.fabulexie.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

/**
 * @author christophe.dame
 */
@RestController
public class DocumentController extends AbstractController {

		private final Logger logger = LoggerFactory.getLogger(UserController.class);

		private static final String FILE_PATH = "../../fabulexieFiles/";
		@Autowired
		private DocumentService documentService;
		@Autowired
		private UserService userService;

		private AtomicLong count = null;
	
		private Cache<String, Long> docTokens = CacheBuilder.newBuilder()
			       .expireAfterWrite(30, TimeUnit.MINUTES)
			       .build();

		private Cache<String, Long> userTokens = CacheBuilder.newBuilder()
			       .expireAfterWrite(30, TimeUnit.MINUTES)
			       .build();
		
		private Cache<String, String> renderedReader = CacheBuilder.newBuilder()
			       .expireAfterWrite(1, TimeUnit.MINUTES)
			       .build();

		
		private static String pagedJs = null;
		
		private static synchronized String getPagedJs() {
			if (pagedJs!=null) {
				return pagedJs;
			}
			Scanner s =  new Scanner(DocumentController.class.getClassLoader().getResourceAsStream("./readerjs/paged.js"), "UTF-8");
			pagedJs = s.useDelimiter("\\A").next();
			s.close();
			return pagedJs;
		}
		
		@GetMapping(value = "/documents")
		@IsAuthenticated
	    public RestfulList<Document> all(@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "10") int count, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "id") String orderBy, @RequestParam(defaultValue = "ASC") String order) {
			RestfulList<Document> result = new RestfulList<>();
			FabulexiePrincipal connected = SecurityUtils.getConnectedUser();
	        Long userId = connected.getId();
			if (!SecurityUtils.isAdmin()) {
				if (StringUtils.isNotBlank(q)) {
		        	q = "ownerId:"+userId+" AND "+q;
	        	} else {
	        		q = "ownerId:"+userId;
	        	}
	        }
			Specification<Document> invitationSpec = documentService.getSpecifications(q);
			result.setTotal(getCount(invitationSpec));
			if(count*(page-1)>result.getTotal()) {
				page = (int) (result.getTotal() / count);
			}
			result.setItems(documentService.list(invitationSpec, count, page, orderBy, order));
			for(Document doc : result.getItems()) {
				doc.setAccessToken(UUID.randomUUID().toString());
				docTokens.put(doc.getAccessToken(), doc.getId());
				userTokens.put(doc.getAccessToken(), userId);
			}
			
			result.setCount(Long.valueOf(result.getItems().size()));
			result.add(linkTo(methodOn(DocumentController.class).all(q, count, page, orderBy, order)).withSelfRel());
			if(page*count<result.getTotal()) {
				result.add(linkTo(methodOn(DocumentController.class).all(q, count, page+1, orderBy, order)).withRel("next"));
			}
			if (page>1) {
				result.add(linkTo(methodOn(DocumentController.class).all(q, count, page-1, orderBy, order)).withRel("prev"));
			}
	        
			return result;
	    }
		
		@PostMapping(value = "/documents")
	    @ResponseStatus(HttpStatus.CREATED)
	    @IsAuthenticated
	    public Document createDoc(@RequestHeader Long directoryId,
	            @RequestHeader String filename,
	            HttpServletRequest request) {
	        FabulexiePrincipal connected = SecurityUtils.getConnectedUser();
	        
	        try {
	            //byte[] content = IOUtils.toByteArray(request.getInputStream());

	            //request.getInputStream().close();
	            String displayedName = filename;
	            if (filename.indexOf(' ') >= 0) {
	                filename = filename.trim().replaceAll(" ", "");
	            }
	            String targetPath = FILE_PATH+filename;
	            File target = Paths.get(targetPath).toFile();
	            FileUtils.copyInputStreamToFile(request.getInputStream(), target);
	            String htmlPath = FILE_PATH+filename+".html";
	            File htmlTarget = Paths.get(htmlPath).toFile();
	            DocxParser.convertDocxToHtml(target, htmlTarget);
	            Document doc = new Document();
	            doc.setName(displayedName);
	            doc.setOriginalPath(targetPath);
	            doc.setHtmlPath(htmlPath);
	            doc.setOwnerId(connected.getId());
	            documentService.create(doc);
	            doc.setAccessToken(UUID.randomUUID().toString());
				docTokens.put(doc.getAccessToken(), doc.getId());
				userTokens.put(doc.getAccessToken(), connected.getId());
	            return doc;
	        } catch (IOException e) {
	            throw new TechnicalException("Document upload failed", e);
	        } catch (Docx4JException e) {
	        	throw new TechnicalException("Document parsing failed", e);
			}
	    }
		
		@GetMapping(value = "/documents/{docToken}/html", produces = "text/html")
		public String getHtml(@PathVariable String docToken) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Document doc = documentService.getById(docId);
			if (doc.getOwnerId() != userId) {
				throw new UnauthorizedException("Access forbidden");
			}
			try {
				return FileUtils.readFileToString(new File(doc.getHtmlPath()), "UTF-8");
			} catch (IOException e) {
				throw new TechnicalException("Document could not be read", e);
			}
		}
		
		@GetMapping(value = "/documents/{docToken}/docx/", produces = "application/octet-stream")
	    @ResponseBody
	    public ResponseEntity<InputStreamResource> getOriginal(@PathVariable String docToken) {
			
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Document doc = documentService.getById(docId);
			if (doc.getOwnerId() != userId) {
				throw new UnauthorizedException("Access forbidden");
			}
			
			try {
				InputStream is = new FileInputStream(new File(doc.getOriginalPath()));

	        
				return ResponseEntity.ok()
					.header("content-disposition", "inline; filename=\"" + doc.getName() + "\"")
	                .contentLength(is.available())
	                .contentType(MediaType.APPLICATION_OCTET_STREAM)
	                .body(new InputStreamResource(is));
			} catch (IOException e) {
				throw new TechnicalException("File could not be read", e);
			}
	    }
		
		@GetMapping(value = "/documents/{docToken}/adapt/html", produces = "text/html")
		public String getAdaptedHtml(@PathVariable String docToken) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Document doc = documentService.getById(docId);
			if (doc.getOwnerId() != userId) {
				throw new UnauthorizedException("Access forbidden");
			}
			try {
				String html = FileUtils.readFileToString(new File(doc.getHtmlPath()), "UTF-8");
				User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				return HtmlParser.transformHtml(html, ac, false);
			} catch (IOException e) {
				throw new TechnicalException("Document could not be adapted", e);
			}	
		}
		
		@GetMapping(value = "/documents/{docToken}/adapt/docx/", produces = "application/octet-stream")
	    @ResponseBody
	    public ResponseEntity<InputStreamResource> getAdaptedDocx(@PathVariable String docToken) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Document doc = documentService.getById(docId);
			if (doc.getOwnerId() != userId) {
				throw new UnauthorizedException("Access forbidden");
			}
			
			try {
				User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				
				File adapted = DocxParser.adaptDocument(doc, ac);
				InputStream is = new FileInputStream(adapted);
				return ResponseEntity.ok()
					.header("content-disposition", "inline; filename=\"" + doc.getName() + "\"")
		            .contentLength(is.available())
	                .contentType(MediaType.APPLICATION_OCTET_STREAM)
	                .body(new InputStreamResource(is));
			} catch (IOException | Docx4JException | JAXBException e) {
				throw new TechnicalException("File could not be adapted", e);
			}
	    }
		
		@GetMapping(value = "/documents/{docToken}/adapt/pdf/", produces = "application/octet-stream")
	    @ResponseBody
	    public ResponseEntity<InputStreamResource> getAdaptedPdf(@PathVariable String docToken) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Document doc = documentService.getById(docId);
			if (doc.getOwnerId() != userId) {
				throw new UnauthorizedException("Access forbidden");
			}
			
			try {
				/*User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				
				File adapted = DocxParser.adaptDocument(doc, ac);
				*/
				InputStream is = new FileInputStream("contratTravail.pdf");
				return ResponseEntity.ok()
					.header("content-disposition", "inline; filename=\"mon.pdf\"")
		            .contentLength(is.available())
		            .contentType(MediaType.APPLICATION_PDF)
	                .body(new InputStreamResource(is));
			} catch (IOException e) {
				throw new TechnicalException("File could not be adapted", e);
			}
	    }
		
		@GetMapping(value = "/documents/{docToken}/adapt/reader/{width}/{height}", produces = "text/html")
		public String getAdaptedReader(@PathVariable String docToken, @PathVariable Double width, @PathVariable Double height) {
			width = width-2;
			height = height - 12;
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Document doc = documentService.getById(docId);
			if (doc.getOwnerId() != userId) {
				throw new UnauthorizedException("Access forbidden");
			}
			try {
				String html = FileUtils.readFileToString(new File(doc.getHtmlPath()), "UTF-8");
				User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				String adapted = HtmlParser.transformHtml(html, ac, width, height);
				return adapted
						.replace("<head>", "<head><style type=\"text/css\">@page {\n" + 
						"	size: "+width+"px "+height+"px;\n" + 
						"	margin: 0;\n" + 
						"} body,html {margin: 0;\n" + 
						"    padding: 0;\n" + 
						"    overflow: hidden;} </style><script>"+getPagedJs()+"</script>");
				
			} catch (IOException e) {
				throw new TechnicalException("Document could not be adapted", e);
			}	
		}
		
		@PostMapping(value = "/documents/{docToken}/adapt/reader/{width}/{height}", produces = MediaType.APPLICATION_JSON_VALUE)
		public Map<String, String> savedAdaptedReader(@PathVariable String docToken, @PathVariable Double width, @PathVariable Double height, @RequestBody Map<String, String> html) throws IOException {
			Map<String, String> result = new HashMap<>();
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			String htmlContent = HtmlParser.clean(html.get("html"));
			renderedReader.put(docToken, htmlContent);
			result.put(docToken, "success");
			return result;
		}
		
		@GetMapping(value = "/documents/{docToken}/saved/reader/{width}/{height}", produces = MediaType.TEXT_XML_VALUE)
		public String savedAdaptedReader(@PathVariable String docToken, @PathVariable Double width, @PathVariable Double height) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			return renderedReader.getIfPresent(docToken);
		}

		private long getCount(Specification<Document> spec) {
			if (spec != null) {
				return documentService.count(spec);
			}
			if (count==null) {
				count = new AtomicLong(documentService.count());
			}
			return count.get();
		}
		
		@Override
		public Logger getLogger() {
			return logger;
		}
}
