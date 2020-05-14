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
package org.fabulexie.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

/**
 * @author christophe.dame
 */
@Entity
public class Config extends BaseEntity<Long> {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	private String googleClientId;
	private String faceBookAppId;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String faceBookAppSecret;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public String getGoogleClientId() {
		return googleClientId;
	}
	public void setGoogleClientId(String googleClientId) {
		this.googleClientId = googleClientId;
	}
	public String getFaceBookAppId() {
		return faceBookAppId;
	}
	public void setFaceBookAppId(String faceBookAppId) {
		this.faceBookAppId = faceBookAppId;
	}
	public String getFaceBookAppSecret() {
		return faceBookAppSecret;
	}
	public void setFaceBookAppSecret(String faceBookAppSecret) {
		this.faceBookAppSecret = faceBookAppSecret;
	}
			
	
}
