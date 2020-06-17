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

import java.util.Arrays;
import java.util.List;

import org.fabulexie.model.document.AccessEnum;
import org.fabulexie.model.document.Directory;
import org.fabulexie.model.document.Space;
import org.fabulexie.model.document.SpaceAccess;
import org.fabulexie.security.FabulexiePrincipal;
import org.fabulexie.security.annotation.SelfAccessOrAdmin;
import org.fabulexie.service.DirectoryService;
import org.fabulexie.service.SpaceService;
import org.fabulexie.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
public class DirectoryController extends AbstractController {

		private final Logger logger = LoggerFactory.getLogger(DirectoryController.class);

		@Autowired
		private SpaceService spaceService;
		
		@Autowired
		private DirectoryService directoryService;
	
		@GetMapping(value = "/users/{userId}/spaces")
		@SelfAccessOrAdmin
	    public List<SpaceAccess> spaces(@PathVariable Long userId) {
			return spaceService.getUserSpaceAccesses(userId);
	    }
		
		@GetMapping(value = "/users/{userId}/spaces/{spaceId}/directories")
		@SelfAccessOrAdmin
	    public List<Directory> directories(@PathVariable Long userId, @PathVariable Long spaceId) {
			spaceService.checkSpaceAccess(userId, spaceId);
	
	        return directoryService.findByParentIdAndSpaceId(null, spaceId);
	    }
		
		
		@GetMapping(value = "/users/{userId}/spaces/{spaceId}/directories/{parentId}")
		@SelfAccessOrAdmin
	    public List<Directory> SubDirectories(@PathVariable Long userId, @PathVariable Long spaceId, @PathVariable Long parentId) {
			spaceService.checkSpaceAccess(userId, spaceId);
			
			return directoryService.findByParentIdAndSpaceId(parentId, spaceId);
	        
	    }
		
		@PostMapping(value = "/users/{userId}/spaces/{spaceId}/directories")
	    @ResponseStatus(HttpStatus.CREATED)
		@SelfAccessOrAdmin
	    public Directory createDirectory(@PathVariable Long userId, @PathVariable Long spaceId, @RequestBody Directory dir) {
			spaceService.checkSpaceAccess(userId, spaceId,  Arrays.asList(AccessEnum.WRITER, AccessEnum.ADMIN));
			FabulexiePrincipal connected = SecurityUtils.getConnectedUser();
	        dir.setOwnerId(connected.getId());
	        dir.setSpace(new Space());
	        dir.getSpace().setId(spaceId);
	        return directoryService.create(dir);
	    }

		
		@PostMapping(value = "/users/{userId}/spaces/{spaceId}/directories/{parentId}")
	    @ResponseStatus(HttpStatus.CREATED)
		@SelfAccessOrAdmin
	    public Directory createSubDirectory(@PathVariable Long userId, @PathVariable Long spaceId, @PathVariable Long parentId, @RequestBody Directory dir) {
			spaceService.checkSpaceAccess(userId, spaceId,  Arrays.asList(AccessEnum.WRITER, AccessEnum.ADMIN));
			FabulexiePrincipal connected = SecurityUtils.getConnectedUser();
	        dir.setOwnerId(connected.getId());
        	dir.setParent(new Directory());
        	dir.getParent().setId(parentId);
	        dir.setSpace(new Space());
	        dir.getSpace().setId(spaceId);

        	return directoryService.create(dir);
	    }
		
		@Override
		public Logger getLogger() {
			return logger;
		}
}
