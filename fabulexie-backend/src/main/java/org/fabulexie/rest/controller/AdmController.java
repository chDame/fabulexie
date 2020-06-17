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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.fabulexie.model.Config;
import org.fabulexie.model.User;
import org.fabulexie.model.document.AccessEnum;
import org.fabulexie.model.document.Space;
import org.fabulexie.security.annotation.IsAdmin;
import org.fabulexie.service.ConfigService;
import org.fabulexie.service.InitializationFacade;
import org.fabulexie.service.SpaceService;
import org.fabulexie.service.UserConfigService;
import org.fabulexie.service.UserService;
import org.fabulexie.util.PersistenceUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



/**
 * @author christophe.dame
 */
@RestController
@RequestMapping("/admin")
@Transactional
public class AdmController extends AbstractController {

	    private final Logger logger = LoggerFactory.getLogger(AdmController.class);

	    @Autowired
	    private InitializationFacade schemaCreatorService;
	    @Autowired
	    private UserConfigService userConfigService;
	    @Autowired
	    private UserService userService;
	    @Autowired
	    private ConfigService configService;
	    @Autowired
	    private SpaceService spaceService;
	    
	    @GetMapping("/config")
	    public Config getConf()  {
			Config conf = configService.get();
			if (conf==null) {
				return new Config();
			}
			//conf.setFaceBookAppSecret(null);
			return conf;
		}
		
		@PatchMapping("/config")
		@IsAdmin
		public Config patchConf(@RequestBody Config config) {
			Config currentConf = configService.get();
			if (currentConf==null) {
				configService.create(config);
				return config;
			}
			PersistenceUtil.copyNonNullProperties(config, currentConf);
			configService.update(currentConf);
			currentConf.setFaceBookAppSecret(null);
			return currentConf;
		}

	    /*@RequestMapping(value = "/rebuild", method = RequestMethod.GET, produces = "application/json")
	    @ResponseStatus(HttpStatus.OK)
	    public Map<String, Object> rebuild() {
	    	Map<String, Object> result = new HashMap<>();
	    	schemaCreatorService.dropTables();
	    	
	    	result.put("tables", schemaCreatorService.createTables());
	    	return result;
	    }*/
	    
	    @RequestMapping(value = "/populate", method = RequestMethod.GET, produces = "application/json")
	    @ResponseStatus(HttpStatus.OK)
	    public Map<String, Object> populate() {
	    	
	    	userConfigService.deleteAll();
	    	userService.deleteAll();
	    	Space publicSpace = new Space();
	    	publicSpace.setName("Public");
	    	publicSpace.setOwnerId(1L);
	    	
	    	spaceService.create(publicSpace);
	    	Map<String, Object> result = new HashMap<>();

	    	result.put("users", buildSampleUsers(publicSpace));
	    	
	    	result.put("tutors", buildSampleTutors(publicSpace));
	    	
	    	result.put("admins", buildSampleAdmins(publicSpace));

	    	schemaCreatorService.setEmpty(false);
	    	return result;
	    }
	    
	    private void createPrivateSpace(User u) {

	    	Space privateSpace = new Space();
	    	privateSpace.setName("My space");
	    	privateSpace.setOwnerId(u.getId());
	    	spaceService.create(privateSpace);
    		spaceService.grantAccess(u, privateSpace, AccessEnum.ADMIN);
	    	
	    }
	    
		public List<String> buildSampleUsers(Space publicSpace) {
	    	List<String> users = new ArrayList<>();
	    	for(int i=1;i<20;i++) {
	    		User u = new User();
	    		u.setFirstname("Firstname "+i);
	    		u.setLastname("Dupont");
	    		u.setPassword("test");
	    		u.setEmail("user"+i+"@fabulexie.fr");
	    		u.setValid(true);
	    		u.setLocked(false);
	    		u = userService.create(u);
	    		spaceService.grantAccess(u, publicSpace, AccessEnum.READER);
	    		createPrivateSpace(u);
	    		users.add(u.getEmail()+" / test");
	    	}
	    	return users;
	    }

	    public List<String> buildSampleTutors(Space publicSpace) {
	    	List<String> tutors = new ArrayList<>();
	    	for(int i=1;i<5;i++) {
	    		User u = new User();
	    		u.setFirstname("Tutor "+i);
	    		u.setLastname("Lefranc");
	    		u.setPassword("test");
	    		u.setTutor(true);
	    		u.setValid(true);
	    		u.setEmail("tutor"+i+"@fabulexie.fr");
	    		u = userService.create(u);
	    		spaceService.grantAccess(u, publicSpace, AccessEnum.WRITER);
	    		createPrivateSpace(u);
	    		tutors.add(u.getEmail()+" / test");
	    	}
	    	return tutors;
	    }

	    public List<String> buildSampleAdmins(Space publicSpace) {
	    	List<String> admins = new ArrayList<>();
	    	for(int i=1;i<5;i++) {
	    		User u = new User();
	    		u.setFirstname("Admin "+i);
	    		u.setLastname("Adm");
	    		u.setPassword("test");
	    		u.setAdmin(true);
	    		u.setTutor(true);
	    		u.setValid(true);
	    		u.setEmail("admin"+i+"@fabulexie.fr");
	    		u = userService.create(u);
	    		spaceService.grantAccess(u, publicSpace, AccessEnum.ADMIN);
	    		createPrivateSpace(u);
	    		admins.add(u.getEmail()+" / test");
	    	}
	    	return admins;
	    }

		@Override
	    public Logger getLogger() {
	        return logger;
	    }

	}