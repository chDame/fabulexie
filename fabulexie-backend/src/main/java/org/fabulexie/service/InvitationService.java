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

import java.util.Date;
import java.util.List;

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Invitation;
import org.fabulexie.persistence.InvitationRepository;
import org.fabulexie.service.common.AbstractService;
import org.fabulexie.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class InvitationService extends AbstractService<Invitation> {
	
	@Autowired
	private InvitationRepository invitationMapper;

	@Override
	protected InvitationRepository getRepository() {
		return invitationMapper;
	}
	
    public Invitation getByEmail(String email) {
        return invitationMapper.findByEmail(email);
    }
	
    public List<Invitation> getByOwnerId(Long ownerId) {
        return invitationMapper.findByOwnerId(ownerId);
    }
	
	public Invitation create(Invitation invitation) {
		if (invitationMapper.findByEmail(invitation.getEmail())!=null) {
			throw new UnauthorizedException("Account already exists");
		}
		if (getByEmail(invitation.getEmail())!=null) {
			throw new UnauthorizedException("Invitation already sent");
		}
		invitation.setEmission(new Date());
        invitation.setCode(SecurityUtils.generateFriendlyCode());
		invitationMapper.save(invitation);
		return invitation;
	}
}
