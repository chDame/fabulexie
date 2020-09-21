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

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.fabulexie.model.rules.EvenSyllabeRule;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.model.rules.OddSyllabeRule;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author christophe.dame
 */
@Entity
public class UserConfig extends BaseEntity<Long> {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;  
	
	private String name;
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name="user_id", nullable=false)
    private User user;

	private Boolean openDys;

	private Integer extraLineSpace;

	private Integer extraWordSpace;
	
	@Column(columnDefinition = "boolean default false")
    private Boolean syllabe = false;
	
	@OneToOne(mappedBy="config", 
			fetch = FetchType.EAGER,
		    orphanRemoval = true,
		    cascade = CascadeType.ALL)
    private EvenSyllabeRule evenSyllabeRule;
	
	@OneToOne(mappedBy="config", 
			fetch = FetchType.EAGER,
		    orphanRemoval = true,
		    cascade = CascadeType.ALL)
    private OddSyllabeRule oddSyllabeRule;
	
	
	@OneToMany(mappedBy="config", fetch = FetchType.EAGER)
    private List<LetterRule> letterRules;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public List<LetterRule> getLetterRules() {
		return letterRules;
	}

	public void setLetterRules(List<LetterRule> letterRules) {
		this.letterRules = letterRules;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Boolean getOpenDys() {
		return openDys;
	}

	public void setOpenDys(Boolean openDys) {
		this.openDys = openDys;
	}

	public Integer getExtraLineSpace() {
		return extraLineSpace;
	}

	public void setExtraLineSpace(Integer extraLineSpace) {
		this.extraLineSpace = extraLineSpace;
	}

	public Integer getExtraWordSpace() {
		return extraWordSpace;
	}

	public void setExtraWordSpace(Integer extraWordSpace) {
		this.extraWordSpace = extraWordSpace;
	}

	public boolean isSyllabe() {
		return syllabe;
	}

	public void setSyllabe(boolean syllabe) {
		this.syllabe = syllabe;
	}

	public EvenSyllabeRule getEvenSyllabeRule() {
		return evenSyllabeRule;
	}

	public void setEvenSyllabeRule(EvenSyllabeRule evenSyllabeRule) {
		this.evenSyllabeRule = evenSyllabeRule;
	}

	public OddSyllabeRule getOddSyllabeRule() {
		return oddSyllabeRule;
	}

	public void setOddSyllabeRule(OddSyllabeRule oddSyllabeRule) {
		this.oddSyllabeRule = oddSyllabeRule;
	}
	
}
