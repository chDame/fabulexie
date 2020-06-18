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

import java.awt.FontFormatException;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.docx4j.openpackaging.exceptions.Docx4JException;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.core.cover.CoverGenerator;
import org.fabulexie.core.html.parser.HtmlParser;
import org.fabulexie.core.utils.docx.DocxParser;
import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.document.AccessEnum;
import org.fabulexie.model.document.Directory;
import org.fabulexie.model.document.Document;
import org.fabulexie.model.document.Space;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.security.FabulexiePrincipal;
import org.fabulexie.security.annotation.IsAuthenticated;
import org.fabulexie.security.annotation.SelfAccessOrAdmin;
import org.fabulexie.service.DocumentService;
import org.fabulexie.service.SpaceService;
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

		private final Logger logger = LoggerFactory.getLogger(DocumentController.class);

		private static final String FILE_PATH = "../../fabulexieFiles/";
		@Autowired
		private DocumentService documentService;
		@Autowired
		private UserService userService;
		
		@Autowired
		private SpaceService spaceService;
	
		private Cache<String, Long> docTokens = CacheBuilder.newBuilder()
			       .expireAfterWrite(4, TimeUnit.HOURS)
			       .build();

		private Cache<String, Long> spaceTokens = CacheBuilder.newBuilder()
			       .expireAfterWrite(4, TimeUnit.HOURS)
			       .build();
		

		private Cache<String, Long> userTokens = CacheBuilder.newBuilder()
			       .expireAfterWrite(4, TimeUnit.HOURS)
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
		
		@GetMapping(value = "/users/{userId}/spaces/{spaceId}/search")
		@IsAuthenticated
	    public RestfulList<Document> search(@PathVariable Long userId, @PathVariable Long spaceId,
	    		@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "10") int count, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "id") String orderBy, @RequestParam(defaultValue = "ASC") String order) {
			spaceService.checkSpaceAccess(userId, spaceId);
			RestfulList<Document> result = new RestfulList<>();
	        
			Specification<Document> invitationSpec = documentService.getSpecifications(q);
			result.setTotal(documentService.count(invitationSpec));
			if(count*(page-1)>result.getTotal()) {
				page = (int) (result.getTotal() / count);
			}
			result.setItems(documentService.list(invitationSpec, count, page, orderBy, order));
			for(Document doc : result.getItems()) {
				doc.setAccessToken(UUID.randomUUID().toString());
				docTokens.put(doc.getAccessToken(), doc.getId());
				spaceTokens.put(doc.getAccessToken(), spaceId);
				userTokens.put(doc.getAccessToken(), userId);
			}
			
			result.setCount(Long.valueOf(result.getItems().size()));
			result.add(linkTo(methodOn(DocumentController.class).search(userId, spaceId, q, count, page, orderBy, order)).withSelfRel());
			if(page*count<result.getTotal()) {
				result.add(linkTo(methodOn(DocumentController.class).search(userId, spaceId, q, count, page+1, orderBy, order)).withRel("next"));
			}
			if (page>1) {
				result.add(linkTo(methodOn(DocumentController.class).search(userId, spaceId, q, count, page-1, orderBy, order)).withRel("prev"));
			}
	        
			return result;
	    }
		
		@GetMapping(value = "/users/{userId}/spaces/{spaceId}/documents")
		@SelfAccessOrAdmin
	    public List<Document> directories(@PathVariable Long userId, @PathVariable Long spaceId) {
			spaceService.checkSpaceAccess(userId, spaceId);
	
	        List<Document> docs = documentService.findByParentIdAndSpaceId(null, spaceId);
	   
	        for(Document doc : docs) {
				doc.setAccessToken(UUID.randomUUID().toString());
				docTokens.put(doc.getAccessToken(), doc.getId());
				spaceTokens.put(doc.getAccessToken(), spaceId);
				userTokens.put(doc.getAccessToken(), userId);
			}
	        return docs;
		}
		
		
		@GetMapping(value = "/users/{userId}/spaces/{spaceId}/directories/{parentId}/documents")
		@SelfAccessOrAdmin
	    public List<Document> SubDirectories(@PathVariable Long userId, @PathVariable Long spaceId, @PathVariable Long parentId) {
			spaceService.checkSpaceAccess(userId, spaceId);
			
			List<Document> docs = documentService.findByParentIdAndSpaceId(parentId, spaceId);

	        for(Document doc : docs) {
				doc.setAccessToken(UUID.randomUUID().toString());
				docTokens.put(doc.getAccessToken(), doc.getId());
				spaceTokens.put(doc.getAccessToken(), spaceId);
				userTokens.put(doc.getAccessToken(), userId);
			}
	        return docs; 
	    }
		
		
		private Document buildDoc(String name, String title, String description, String author, Long ownerId, Long spaceId) {
			String displayedName = name;
            if (name.indexOf(' ') >= 0) {
                name = name.trim().replaceAll(" ", "");
            }
            //String targetPath = FILE_PATH+name;
            //String htmlPath = FILE_PATH+name+".html";
			Document doc = new Document();
			doc.setName(displayedName);
            doc.setTitle(title);
            doc.setDescription(description);
            doc.setAuthor(author);
            //doc.setOriginalPath(targetPath);
            //doc.setHtmlPath(htmlPath);
            doc.setOwnerId(ownerId);
			doc.setSpace(new Space());
			doc.getSpace().setId(spaceId);
            return doc;
		}
		
		private File getDocxFile(Long docId) {
			return Paths.get( FILE_PATH+docId+"/file.docx").toFile();
		}
		private File getHtmlFile(Long docId) {
			return Paths.get( FILE_PATH+docId+"/file.html").toFile();
		}
		private File getCover(Long docId) {
			return Paths.get( FILE_PATH+docId+"/cover.png").toFile();
		}
		
		private Document createDoc(Document doc, InputStream content) throws IOException, Docx4JException, FontFormatException {

	        documentService.create(doc);
	        File docx = getDocxFile(doc.getId());
	        FileUtils.copyInputStreamToFile(content, docx);
	           
	        DocxParser.convertDocxToHtml(docx, getHtmlFile(doc.getId()));
	
	        BufferedImage bi = CoverGenerator.buildCover(doc.getAuthor(), doc.getTitle());
			ImageIO.write(bi,"png", getCover(doc.getId()));
			
	        doc.setAccessToken(UUID.randomUUID().toString());
			docTokens.put(doc.getAccessToken(), doc.getId());
			spaceTokens.put(doc.getAccessToken(), doc.getSpace().getId());
			userTokens.put(doc.getAccessToken(), doc.getOwnerId());
	        return doc;

		}
		
		@PostMapping(value = "/users/{userId}/spaces/{spaceId}/documents")
	    @ResponseStatus(HttpStatus.CREATED)
		@SelfAccessOrAdmin
	    public Document createRootDoc(@PathVariable Long userId, @PathVariable Long spaceId, 
	            @RequestHeader String name,
	            @RequestHeader String title,
	            @RequestHeader String description,
	            @RequestHeader String author,
	            HttpServletRequest request) {
			spaceService.checkSpaceAccess(userId, spaceId, Arrays.asList(AccessEnum.WRITER, AccessEnum.ADMIN));
			FabulexiePrincipal connected = SecurityUtils.getConnectedUser();
	        
			Document doc = buildDoc(name, title, description, author, connected.getId(), spaceId);

			try {
				return createDoc(doc, request.getInputStream());
	        } catch (IOException e) {
	            throw new TechnicalException("Document upload failed", e);
	        } catch (Docx4JException e) {
	        	throw new TechnicalException("Document parsing failed", e);
			} catch (FontFormatException e) {
	        	throw new TechnicalException("Cover generation failed", e);
			}
	    }
		
		@PostMapping(value = "/users/{userId}/spaces/{spaceId}/directories/{directoryId}/documents")
	    @ResponseStatus(HttpStatus.CREATED)
		@SelfAccessOrAdmin
	    public Document createDoc(@PathVariable Long userId, @PathVariable Long spaceId, 
	    		@PathVariable Long directoryId,
	            @RequestHeader String name,
	            @RequestHeader String title,
	            @RequestHeader String description,
	            @RequestHeader String author,
	            HttpServletRequest request) {
			spaceService.checkSpaceAccess(userId, spaceId, Arrays.asList(AccessEnum.WRITER, AccessEnum.ADMIN));
			FabulexiePrincipal connected = SecurityUtils.getConnectedUser();
	        
			Document doc = buildDoc(name, title, description, author, connected.getId(), spaceId);
			doc.setParent(new Directory());
			doc.getParent().setId(directoryId);

			try {
				return createDoc(doc, request.getInputStream());
	        } catch (IOException e) {
	            throw new TechnicalException("Document upload failed", e);
	        } catch (Docx4JException e) {
	        	throw new TechnicalException("Document parsing failed", e);
			} catch (FontFormatException e) {
	        	throw new TechnicalException("Cover generation failed", e);
			}
	    }
		
		@GetMapping(value = "/documents/{docToken}/html", produces = "text/html")
		public String getHtml(@PathVariable String docToken) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Long spaceId = spaceTokens.getIfPresent(docToken);
			spaceService.checkSpaceAccess(userId, spaceId);
			
			try {
				return FileUtils.readFileToString(getHtmlFile(docId), "UTF-8");
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
			Long spaceId = spaceTokens.getIfPresent(docToken);
			spaceService.checkSpaceAccess(userId, spaceId);
			Document doc = documentService.getById(docId);
			try {
				InputStream is = new FileInputStream(getDocxFile(docId));
	        
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
			Long spaceId = spaceTokens.getIfPresent(docToken);
			spaceService.checkSpaceAccess(userId, spaceId);
			try {
				String html = FileUtils.readFileToString(getHtmlFile(docId), "UTF-8");
				User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				return HtmlParser.transformHtml(html, ac, false);
			} catch (IOException e) {
				throw new TechnicalException("Document could not be adapted", e);
			}	
		}
		
		@GetMapping(value = "/documents/{docToken}/cover.png", produces = "text/html")
		public void getCover(@PathVariable String docToken, HttpServletResponse response) throws IOException {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			InputStream in = new FileInputStream(getCover(docId));//.getResourceAsStream("/WEB-INF/images/image-example.jpg");
		    response.setContentType(MediaType.IMAGE_PNG_VALUE);
		    IOUtils.copy(in, response.getOutputStream());
		}
		
		@GetMapping(value = "/documents/{docToken}/adapt/docx/", produces = "application/octet-stream")
	    @ResponseBody
	    public ResponseEntity<InputStreamResource> getAdaptedDocx(@PathVariable String docToken) {
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Long spaceId = spaceTokens.getIfPresent(docToken);
			spaceService.checkSpaceAccess(userId, spaceId);
			Document doc = documentService.getById(docId);
			
			try {
				User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				
				File adapted = DocxParser.adaptDocument(getHtmlFile(docId).toPath(), getDocxFile(docId).toPath(), ac);
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
		
		/*
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
				User connected = userService.getById(userId);
				UserConfig ac = connected.getActiveConfig();
				
				File adapted = DocxParser.adaptDocument(doc, ac);
				
				InputStream is = new FileInputStream("blop.pdf");
				return ResponseEntity.ok()
					.header("content-disposition", "inline; filename=\"mon.pdf\"")
		            .contentLength(is.available())
		            .contentType(MediaType.APPLICATION_PDF)
	                .body(new InputStreamResource(is));
			} catch (IOException e) {
				throw new TechnicalException("File could not be adapted", e);
			}
	    }*/
		
		@GetMapping(value = "/documents/{docToken}/adapt/reader/{width}/{height}", produces = "text/html")
		public String getAdaptedReader(@PathVariable String docToken, @PathVariable Double width, @PathVariable Double height) {
			width = width-2;
			height = height - 12;
			Long docId = docTokens.getIfPresent(docToken);
			if (docId==null) {
				throw new UnauthorizedException("Forbidden access");
			}
			Long userId = userTokens.getIfPresent(docToken);
			Long spaceId = spaceTokens.getIfPresent(docToken);
			spaceService.checkSpaceAccess(userId, spaceId);

			try {
				String html = FileUtils.readFileToString(getHtmlFile(docId), "UTF-8");
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
		
		@Override
		public Logger getLogger() {
			return logger;
		}
}
