package org.fabulexie.rest.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.fabulexie.model.Config;
import org.fabulexie.model.User;
import org.fabulexie.rest.auth.AuthorizationValidation;
import org.fabulexie.rest.util.PersistenceUtil;
import org.fabulexie.service.ConfigService;
import org.fabulexie.service.InitializationService;
import org.fabulexie.service.UserConfigService;
import org.fabulexie.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/admin")
@Transactional
public class AdmController extends AbstractController {

	    private final Logger logger = LoggerFactory.getLogger(UserController.class);

	    @Autowired
	    private InitializationService schemaCreatorService;
	    @Autowired
	    private UserConfigService userConfigService;
	    @Autowired
	    private UserService userService;
	    @Autowired
	    private ConfigService configService;
	    
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
		@AuthorizationValidation(admin = true)
		public Config patchConf(@RequestHeader("Authorization") String token, 
				@RequestBody Config config) {
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
	    	Map<String, Object> result = new HashMap<>();

	    	result.put("users", buildSampleUsers());
	    	
	    	result.put("tutors", buildSampleTutors());
	    	
	    	result.put("admins", buildSampleAdmins());

	    	schemaCreatorService.setEmpty(false);
	    	return result;
	    }
		public List<String> buildSampleUsers() {
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
	    		users.add(u.getEmail()+" / test");
	    	}
	    	return users;
	    }

	    public List<String> buildSampleTutors() {
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
	    		tutors.add(u.getEmail()+" / test");
	    	}
	    	return tutors;
	    }

	    public List<String> buildSampleAdmins() {
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
	    		admins.add(u.getEmail()+" / test");
	    	}
	    	return admins;
	    }

		@Override
	    public Logger getLogger() {
	        return logger;
	    }

	}