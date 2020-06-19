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
package org.fabulexie.service;

import org.fabulexie.model.User;
import org.fabulexie.model.document.AccessEnum;
import org.fabulexie.model.document.Space;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class InitializationFacade {
	
	private boolean empty = false;
	
	@Autowired
	private UserService userService;
    @Autowired
    private SpaceService spaceService;
	
	public void checkEmpty() {
		empty = userService.count()==0;
	}
	
	public boolean isEmpty() {
		return empty;
	}

	public void setEmpty(boolean empty) {
		this.empty = empty;
	}

	public void initialise(User u) {
		u.setAdmin(true);
		u.setValid(true);
		userService.create(u);
		
		createPublicSpace(u, "Public");
		this.empty = false;
	}
	
	private void createPublicSpace(User u, String spaceName) {
		Space s = new Space();
    	s.setName(spaceName);
    	s.setOwnerId(u.getId());
    	s.setGrandPublic(true);
    	spaceService.create(s);
		spaceService.grantAccess(u, s, AccessEnum.ADMIN);
	}
}
