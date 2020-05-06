package org.fabulexie.rest.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.rest.controller.model.Links;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@CrossOrigin(origins = { "*" })
public abstract class AbstractController {

    public abstract Logger getLogger();

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<Map<String, String>> unAuthorizedExceptionHandler(UnauthorizedException e) {
        getLogger().warn("Handling connection exception", e);
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }

    @ExceptionHandler(TechnicalException.class)
    public ResponseEntity<Map<String, String>> technicalExceptionHandler(TechnicalException e) {
        getLogger().warn("Handling connection exception", e);
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    
    @ExceptionHandler(MissingRequestHeaderException.class)
    public ResponseEntity<Map<String, String>> handleMissingParams(MissingRequestHeaderException ex) {
        String name = ex.getHeaderName();
        getLogger().warn(name + " header is missing");
        Map<String, String> response = new HashMap<>();
        if (name.equals("Authorization")) {
            response.put("status", "error");
            response.put("message", "Authorization header required ");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        response.put("status", "error");
        response.put("message", name + " header is missing");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }
    
    protected String getServerHost() {
    	HttpServletRequest request = getHttpServletRequest();
		return request.getRequestURL().substring(0, request.getRequestURL().length() - request.getRequestURI().length());
    }
    
    protected Links getLinks(String q, int count, int page, String orderBy, String order, Long total) {
    	HttpServletRequest request = getHttpServletRequest();
		String url = request.getRequestURL().toString();
		String query = request.getQueryString();
		Links links = new Links();
		links.setSelf(url+"?"+query);
		if(page*count<total) {
			StringBuffer next = new StringBuffer(url).append("?");
			if (StringUtils.isNotBlank(q)) {
				try {
					next.append("q=").append(URLEncoder.encode(q, "UTF-8")).append("&");
				} catch (UnsupportedEncodingException e) {
					next.append("q=").append(q).append("&");
				}
			}
			next.append("count=").append(count);
			next.append("&page=").append(page+1);
			next.append("&orderBy=").append(orderBy);
			next.append("&order=").append(order);
			links.setNext(next.toString());
		}
		if(page>1) {
			StringBuffer prev = new StringBuffer(url).append("?");
			if (StringUtils.isNotBlank(q)) {
				try {
					prev.append("q=").append(URLEncoder.encode(q, "UTF-8")).append("&");
				} catch (UnsupportedEncodingException e) {
					prev.append("q=").append(q).append("&");
				}
			}
			prev.append("count=").append(count);
			prev.append("&page=").append(page-1);
			prev.append("&orderBy=").append(orderBy);
			prev.append("&order=").append(order);
			links.setPrev(prev.toString());
		}
		return links;
    }
    
    
    private HttpServletRequest getHttpServletRequest() {
    	return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }
}
