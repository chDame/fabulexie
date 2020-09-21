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

import java.util.ArrayList;

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.model.document.AccessEnum;
import org.fabulexie.model.document.Space;
import org.fabulexie.model.document.SpaceAccess;
import org.fabulexie.model.rules.EvenSyllabeRule;
import org.fabulexie.model.rules.OddSyllabeRule;
import org.fabulexie.persistence.SpaceAccessRepository;
import org.fabulexie.persistence.SpaceRepository;
import org.fabulexie.persistence.UserConfigRepository;
import org.fabulexie.persistence.UserRepository;
import org.fabulexie.service.common.AbstractService;
import org.fabulexie.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class UserService extends AbstractService<User> {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserConfigRepository userConfigRepository;
	@Autowired 
	private SpaceRepository spaceRepository;
	@Autowired 
	private SpaceAccessRepository spaceAccessRepository;
	
	@Override
	protected UserRepository getRepository() {
		return userRepository;
	}
	
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	
    @Override
	public User create(User user) {
		if (getUserByEmail(user.getEmail())!=null) {
			throw new UnauthorizedException("Account already exists");
		}
		user.setPassword(SecurityUtils.cryptPwd(user.getPassword()));
		if (user.getAdmin()==null) {
			user.setAdmin(false);
		}
		if (user.getValid()==null) {
			user.setValid(false);
		}
		if (user.getTutor()==null) {
			user.setTutor(false);
		}
		user.setLocked(false);
		userRepository.save(user);
		
		//default config
		addDefaultConfig(user);

		//private space
		addPrivateSpace(user);
		return user;
	}
    
    private void addDefaultConfig(User user) {
    	UserConfig config = new UserConfig();
    	config.setOddSyllabeRule(new OddSyllabeRule());
		config.getOddSyllabeRule().setConfig(config);
		config.getOddSyllabeRule().setColor("#990000");
    	config.setEvenSyllabeRule(new EvenSyllabeRule());
		config.getEvenSyllabeRule().setConfig(config);
		config.getEvenSyllabeRule().setColor("#990000");
		config.setUser(user);
		config.setLetterRules(new ArrayList<>());
		config.setName("default");
		userConfigRepository.save(config);
		user.setActiveConfig(config);
		userRepository.save(user);
    }
    
    private void addPrivateSpace(User user) {
		Space s = new Space();
    	s.setName("My space");
    	s.setOwnerId(user.getId());
    	spaceRepository.save(s);
    	SpaceAccess sa = new SpaceAccess();
		sa.setUser(user);
		sa.setSpace(s);
		sa.setRight(AccessEnum.ADMIN);
		spaceAccessRepository.save(sa);
    }

    @Override
	public User update(User u) {
		User duplicate = getUserByEmail(u.getEmail());
		if (duplicate!=null && !duplicate.getId().equals(u.getId())) {
			throw new UnauthorizedException("Account already exists");
		}
		return userRepository.save(u);
	}
	

}
