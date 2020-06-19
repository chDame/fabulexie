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

import java.util.List;

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.model.document.AccessEnum;
import org.fabulexie.model.document.Space;
import org.fabulexie.model.document.SpaceAccess;
import org.fabulexie.persistence.SpaceAccessRepository;
import org.fabulexie.persistence.SpaceRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class SpaceService extends AbstractService<Space>{
	
    @Autowired
    private SpaceAccessRepository spaceAccessRepository;
    @Autowired
    private SpaceRepository spaceRepository;

	@Override
	protected SpaceRepository getRepository() {
		return spaceRepository;
	}

	public List<SpaceAccess> getUserSpaceAccesses(Long userId) {
		return spaceAccessRepository.findByUserId(userId);
	}
    
	public void checkSpaceAccess(Long userId, Long spaceId) {
		checkSpaceAccess(userId, spaceId, null);
	}
	
	public void checkSpaceAccess(Long userId, Long spaceId, List<AccessEnum> rights) {
		SpaceAccess sa = getSpaceAccess(userId, spaceId);
		if (sa==null) {
			throw new UnauthorizedException("Unauthorized access tentative detected");
		}
		if (rights!=null && !rights.contains(sa.getRight())) {
			throw new UnauthorizedException("Unauthorized access tentative detected");
		}
	}
	
	public SpaceAccess grantAccess(User user, Space space, AccessEnum right) {
		SpaceAccess sa = getSpaceAccess(user.getId(), space.getId());
		if (sa!=null) {
			sa.setRight(right);
			return spaceAccessRepository.save(sa);
		}
		sa = new SpaceAccess();
		sa.setUser(user);
		sa.setSpace(space);
		sa.setRight(right);
		return spaceAccessRepository.save(sa);
	}
    
	public SpaceAccess getSpaceAccess(Long userId, Long spaceId) {
		List<SpaceAccess> accesses = spaceAccessRepository.findByUserIdAndSpaceId(userId, spaceId);
		if (accesses==null || accesses.isEmpty()) {
			return null;
		}
		return accesses.get(0);
	}

	public void grantPublicSpaceAccess(User u) {
		List<Space> publicSpaces = spaceRepository.findByGrandPublic(true);
		for(Space s : publicSpaces) {
			if (u.getAdmin()!=null && u.getAdmin()) {
				grantAccess(u, s, AccessEnum.ADMIN);
			} else {
				grantAccess(u, s, AccessEnum.READER);
			}
		}
	}

	public void deleteSpaces(Long userId) {
		spaceAccessRepository.deleteByUserId(userId);
		spaceRepository.deleteByOwnerId(userId);
	}
}
