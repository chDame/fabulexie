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

import java.util.List;
import java.util.Map;

import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.security.annotation.SelfAccessOrTutor;
import org.fabulexie.service.LetterRuleService;
import  org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
public class LetterRuleController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(LetterRuleController.class);

	@Autowired
	private LetterRuleService letterRuleService;

	
	@GetMapping(value = "/users/{userId}/configs/{configId}/rules")
	@SelfAccessOrTutor
	public List<LetterRule> all(@PathVariable Long userId, @PathVariable Long configId) {
		return letterRuleService.findByConfigId(configId);
	}

	@PostMapping(value = "/users/{userId}/configs/{configId}/rules")
	@SelfAccessOrTutor
	@ResponseStatus(HttpStatus.CREATED)
	public LetterRule create(@PathVariable Long userId, @PathVariable Long configId, @RequestBody LetterRule letterRule) {

		throw new IllegalStateException("not implemented");
	}

	@GetMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@SelfAccessOrTutor
	public LetterRule get(@PathVariable Long userId, @PathVariable Long configId, @PathVariable Long id) {

		throw new IllegalStateException("not implemented");
	}

	@PatchMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@SelfAccessOrTutor
	public UserConfig patch(@PathVariable Long userId, @PathVariable Long configId, @PathVariable Long id, @RequestBody LetterRule rule) {

		throw new IllegalStateException("not implemented");
	}

	@PutMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@SelfAccessOrTutor
	public UserConfig put(@PathVariable Long userId, @PathVariable Long configId, @PathVariable Long id, @RequestBody LetterRule rule) {

		throw new IllegalStateException("not implemented");
	}


	@DeleteMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@SelfAccessOrTutor
	public Map<String, Object> delete(@PathVariable Long userId, @PathVariable Long configId, @PathVariable Long id) {

		throw new IllegalStateException("not implemented");
		
	}



	@Override
	public Logger getLogger() {
		return logger;
	}

}
