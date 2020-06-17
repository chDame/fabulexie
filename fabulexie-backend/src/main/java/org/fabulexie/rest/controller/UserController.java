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

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.rest.controller.model.UserResource;
import org.fabulexie.security.annotation.IsAdmin;
import org.fabulexie.security.annotation.SelfAccessOrAdmin;
import org.fabulexie.service.UserService;
import org.fabulexie.service.mail.MailService;
import org.fabulexie.util.PersistenceUtil;
import org.fabulexie.util.SecurityUtils;
import  org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
public class UserController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private MailService mailService;

	private AtomicLong count = null;

	@GetMapping(value = "/users")
	@IsAdmin
	public RestfulList<User> list(@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "10") int count, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "id") String orderBy, @RequestParam(defaultValue = "ASC") String order) {
		RestfulList<User> result = new RestfulList<>();
		Specification<User> specifUser = userService.getSpecifications(q);
		result.setTotal(getCount(specifUser));
		if(count*(page-1)>result.getTotal()) {
			page = (int) (result.getTotal() / count);
		}

		result.setItems(userService.list(specifUser, count, page, orderBy, order));
		result.setCount(Long.valueOf(result.getItems().size()));

		result.add(linkTo(methodOn(UserController.class).list(q, count, page, orderBy, order)).withSelfRel());
		if(page*count<result.getTotal()) {
			result.add(linkTo(methodOn(UserController.class).list(q, count, page+1, orderBy, order)).withRel("next"));
		}
		if (page>1) {
			result.add(linkTo(methodOn(UserController.class).list(q, count, page-1, orderBy, order)).withRel("prev"));
		}
		return result;
	}

	@PostMapping(value = "/users")
	@ResponseStatus(HttpStatus.CREATED)
	@IsAdmin
	public User create(@RequestBody User u) {
		u.setPassword(SecurityUtils.generateFriendlyCode());
		userService.create(u);
		if (count!=null) {
			count.incrementAndGet();
		}
		mailService.mailUserCreated(u, u.getPassword(), getServerHost(), Locale.ENGLISH);

		return u;
	}

	@GetMapping(value = "/users/{userId}", produces = "application/hal+json")
	@SelfAccessOrAdmin
	public UserResource get(@PathVariable Long userId) {

		return new UserResource(userService.getById(userId));
	}

	@PatchMapping(value = "/users/{userId}")
	@SelfAccessOrAdmin
	public UserResource patch(@PathVariable Long userId, @RequestBody User u) {
		User user = userService.getById(userId);
		if (user!=null) {
			if (u.getPassword()!=null) {
				u.setPassword(SecurityUtils.cryptPwd(u.getPassword()));
			}
			u.setId(userId);
			if (u.getAdmin()!=null && u.getAdmin()) {
				u.setTutor(true);
			}
			PersistenceUtil.copyNonNullProperties(u, user);
			userService.update(user);
			return new UserResource(user);
		}

		throw new TechnicalException("User is not persisted");
	}

	@PutMapping(value = "/users/{userId}")
	@SelfAccessOrAdmin
	public UserResource update(@PathVariable Long userId, @RequestBody User u) {
		if (StringUtils.isBlank(u.getPassword())) {
			throw new UnauthorizedException("Clear password is mandatory for full update");
		}
		u.setId(userId);
		u.setPassword(SecurityUtils.cryptPwd(u.getPassword()));
		if (u.getAdmin()!=null && u.getAdmin()) {
			u.setTutor(true);
		}
		User updated = userService.update(u);
	
		if (updated!=null) {
			return new UserResource(u);
		}

		throw new TechnicalException("User is not persisted");
	}

	@DeleteMapping(value = "/users/{userId}")
	@IsAdmin
	public Map<String, Object> delete(@PathVariable Long userId) {
		Map<String, Object> ret = new HashMap<>();
		String status = "error";

		if (userService.delete(userId)) {
			status = "success";
			if (count!=null) {
				count.decrementAndGet();
			}
		}
		ret.put("status", status);
		return ret;
	}


	private long getCount(Specification<User> q) {
		if (q!=null) {
			return userService.count(q);
		}
		if (count==null) {
			count = new AtomicLong(userService.count(null));
		}
		return count.get();
	}

	@Override
	public Logger getLogger() {
		return logger;
	}

}
