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
package org.fabulexie.model.document;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import org.fabulexie.model.BaseEntity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author christophe.dame
 */
@Entity
public class Document extends BaseEntity<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	private Long ownerId;
	private String title;
	private String name;
	private String description;
	private String author;
	@JsonIgnore
	private String originalPath;
	@JsonIgnore
	private String htmlPath;
	@JsonInclude()
	@Transient
	private String accessToken;
	
	@ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="parent_id")
    private Directory parent;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="space_id")
    private Space space;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getOwnerId() {
		return ownerId;
	}
	public void setOwnerId(Long ownerId) {
		this.ownerId = ownerId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAuthor() {
		return author;
	}
	public void setAuthor(String author) {
		this.author = author;
	}
	public String getOriginalPath() {
		return originalPath;
	}
	public void setOriginalPath(String originalPath) {
		this.originalPath = originalPath;
	}
	public String getHtmlPath() {
		return htmlPath;
	}
	public void setHtmlPath(String htmlPath) {
		this.htmlPath = htmlPath;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}
	public Directory getParent() {
		return parent;
	}
	public void setParent(Directory parent) {
		this.parent = parent;
	}
	public Space getSpace() {
		return space;
	}
	public void setSpace(Space space) {
		this.space = space;
	}
	
	
}
