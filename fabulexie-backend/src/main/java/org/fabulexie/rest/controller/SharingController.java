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

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.sharing.SharingUser;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.security.annotation.IsTutorOrAdmin;
import org.fabulexie.service.SharingUserService;
import org.fabulexie.util.PersistenceUtil;
import org.fabulexie.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
public class SharingController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(SharingController.class);

	@Autowired
	private SharingUserService sharingUserService;
	
	@GetMapping(value = "/sharing")
	@IsTutorOrAdmin
	public RestfulList<SharingUser> list() {
		RestfulList<SharingUser> result = new RestfulList<>();
		result.setItems(sharingUserService.findByOwnerId(SecurityUtils.getConnectedUser().getId()));
		result.setTotal(Long.valueOf(result.getItems().size()));
		result.setCount(result.getTotal());
		result.add(linkTo(methodOn(SharingController.class).list()).withSelfRel());

        
		return result;
    }
	
	@PostMapping(value = "/sharing")
	@IsTutorOrAdmin
	@ResponseStatus(HttpStatus.CREATED)
	public SharingUser create(@RequestBody SharingUser sharing) {

		sharing.setOwnerId(SecurityUtils.getConnectedUser().getId());
		SharingUser result = sharingUserService.create(sharing);
		
		return result;
	}
	
	@PatchMapping(value = "/sharing/{sharingId}")
	@IsTutorOrAdmin
	@ResponseStatus(HttpStatus.CREATED)
	public SharingUser patch(@PathVariable Long sharingId, @RequestBody SharingUser sharing) {
		SharingUser existingSharing = sharingUserService.getById(sharingId);
		if (!existingSharing.getOwnerId().equals(SecurityUtils.getConnectedUser().getId())) {
			throw new UnauthorizedException("Unauthorized access tentative detected");
		}
		PersistenceUtil.copyNonNullProperties(sharing, existingSharing);
		SharingUser result = sharingUserService.update(existingSharing);
		
		return result;
	}
	
	
	@Override
	public Logger getLogger() {
		return logger;
	}
}
