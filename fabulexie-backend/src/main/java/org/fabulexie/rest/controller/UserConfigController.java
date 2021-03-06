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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.rest.controller.model.UserConfigResource;
import org.fabulexie.security.annotation.SelfAccessOrTutor;
import org.fabulexie.service.UserConfigService;
import org.fabulexie.util.PersistenceUtil;
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
public class UserConfigController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(UserConfigController.class);

	@Autowired
	private UserConfigService userConfigService;

	@GetMapping(value = "/users/{userId}/configs")
	@SelfAccessOrTutor
	public List<UserConfig> all(@PathVariable Long userId) {
		return userConfigService.findByUserId(userId);
	}

	@PostMapping(value = "/users/{userId}/configs")
	@SelfAccessOrTutor
	@ResponseStatus(HttpStatus.CREATED)
	public UserConfigResource create(@PathVariable Long userId, @RequestBody UserConfig config) {
		User user = new User();
		user.setId(userId);		
		config.setUser(user);
		
		return new UserConfigResource(userConfigService.create(config));
	}

	@GetMapping(value = "/users/{userId}/configs/{id}")
	@SelfAccessOrTutor
	public UserConfigResource get(@PathVariable Long userId, @PathVariable Long id) {
		UserConfig config = userConfigService.getById(id);
		if (config!=null && config.getUser().getId().equals(userId)) {
			return new UserConfigResource(config);
		}
		return null;
	}

	@PatchMapping(value = "/users/{userId}/configs/{id}")
	@SelfAccessOrTutor
	public UserConfigResource patch(@PathVariable Long userId, @PathVariable Long id, @RequestBody UserConfig config) {
		UserConfig existingConfig = userConfigService.getById(id);
		if (existingConfig==null || !existingConfig.getUser().getId().equals(userId)) {
			return null;
		}
		
		PersistenceUtil.copyNonNullProperties(config, existingConfig);

		User user = new User();
		user.setId(userId);
		config.setUser(user);
		userConfigService.update(existingConfig);
		
		return new UserConfigResource(existingConfig);
	}

	@PutMapping(value = "/users/{userId}/configs/{id}")
	@SelfAccessOrTutor
	public UserConfigResource put(@PathVariable Long userId, @PathVariable Long id, @RequestBody UserConfig config) {
		UserConfig existingConfig = userConfigService.getById(id);
		if (existingConfig==null || !existingConfig.getUser().getId().equals(userId)) {
			return null;
		}
		User user = new User();
		user.setId(userId);
		config.setUser(user);
		userConfigService.update(config);
		return new UserConfigResource(config);
	}


	@DeleteMapping(value = "/users/{userId}/configs/{id}")
	@SelfAccessOrTutor
	public Map<String, Object> delete(@PathVariable Long userId, @PathVariable Long id) {
		Map<String, Object> ret = new HashMap<>();

		UserConfig existingConfig = userConfigService.getById(id);
		if (existingConfig==null || !existingConfig.getUser().getId().equals(userId)) {
			ret.put("status", "error");
		} else {
			userConfigService.delete(id);
			ret.put("status", "success");
		}
		
		return ret;
	}



	@Override
	public Logger getLogger() {
		return logger;
	}

}
