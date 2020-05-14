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

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

/**
 * @author christophe.dame
 */
@Entity
public class User extends BaseEntity<Long> {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;
	private String firstname;
	private String lastname;
	@JsonIgnore
	private String codeForPwdChange;
	private Boolean admin;
	private Boolean tutor;
	private Boolean valid;
	private Boolean locked;
	private String photo;
	@JsonIgnore
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	private List<UserConfig> userConfigs;
	@OneToOne(fetch = FetchType.EAGER)
	private UserConfig activeConfig;

	public User() {
	}

	public User(String firstname, String lastname, String email, String password) {
		super();
		this.lastname = lastname;
		this.firstname = firstname;
		this.email = email;
		this.password = password;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getCodeForPwdChange() {
		return codeForPwdChange;
	}

	public void setCodeForPwdChange(String codeForPwdChange) {
		this.codeForPwdChange = codeForPwdChange;
	}

	public Boolean getAdmin() {
		return admin;
	}

	public void setAdmin(Boolean admin) {
		this.admin = admin;
	}

	public Boolean getTutor() {
		return tutor;
	}

	public void setTutor(Boolean tutor) {
		this.tutor = tutor;
	}

	public Boolean getValid() {
		return valid;
	}

	public void setValid(Boolean valid) {
		this.valid = valid;
	}

	public Boolean getLocked() {
		return locked;
	}

	public void setLocked(Boolean locked) {
		this.locked = locked;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public List<UserConfig> getUserConfigs() {
		return userConfigs;
	}

	public void setUserConfigs(List<UserConfig> userConfigs) {
		this.userConfigs = userConfigs;
	}

	public UserConfig getActiveConfig() {
		return activeConfig;
	}

	public void setActiveConfig(UserConfig activeConfig) {
		this.activeConfig = activeConfig;
	}

}
