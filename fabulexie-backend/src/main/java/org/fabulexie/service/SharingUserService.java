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

import org.fabulexie.model.sharing.SharingUser;
import org.fabulexie.persistence.SharingUserRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class SharingUserService extends AbstractService<SharingUser>{
	
    @Autowired
    private SharingUserRepository sharingUserRepository;

	@Override
	protected SharingUserRepository getRepository() {
		return sharingUserRepository;
	}
	
	public List<SharingUser> findByOwnerId(Long ownerId) {
		return sharingUserRepository.findByOwnerId(ownerId);
	}
}