package org.fabulexie.rest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.rest.auth.AuthorizationValidation;
import org.fabulexie.rest.util.PersistenceUtil;
import org.fabulexie.rest.util.SecurityUtils;
import org.fabulexie.service.UserConfigService;
import org.fabulexie.service.UserService;
import  org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;

@RestController
public class UserRuleController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(UserRuleController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private UserConfigService userConfigService;

	@GetMapping(value = "/users/{userId}/configs/{configId}/rules")
	@AuthorizationValidation
	public List<UserConfig> list(@RequestHeader("Authorization") String token, @PathVariable Long userId, @PathVariable Long configId) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isTutor(decoded)) {
			//only an admin is get the config to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		User u = userService.getById(userId);
		return u.getUserConfigs();
	}

	@PostMapping(value = "/users/{userId}/configs/{configId}/rules")
	@AuthorizationValidation(admin = true)
	@ResponseStatus(HttpStatus.CREATED)
	public UserConfig create(@RequestHeader("Authorization") String token, @PathVariable Long userId, @RequestBody UserConfig u) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isTutor(decoded)) {
			//only an admin is get the config to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		
		return userConfigService.create(u);
	}

	@GetMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@AuthorizationValidation
	public UserConfig getUser(@RequestHeader("Authorization") String token, @PathVariable Long userId, @PathVariable Long id) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isTutor(decoded)) {
			//only an admin is get the config to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		UserConfig config = userConfigService.getById(id);
		if (config!=null && config.getUser().getId()==userId) {
			return config;
		}
		return null;
	}

	@PatchMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@AuthorizationValidation
	public UserConfig patch(@RequestHeader("Authorization") String token, @PathVariable Long userId, @PathVariable Long id, @RequestBody UserConfig config) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isAdmin(decoded)) {
			//only an admin is allowed to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		UserConfig existingConfig = userConfigService.getById(id);
		if (existingConfig==null || existingConfig.getUser().getId()!=userId) {
			return null;
		}
		
		PersistenceUtil.copyNonNullProperties(config, existingConfig);
		userConfigService.update(existingConfig);
		
		return existingConfig;
	}

	@PutMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@AuthorizationValidation
	public UserConfig put(@RequestHeader("Authorization") String token, @PathVariable Long userId, @PathVariable Long id, @RequestBody UserConfig config) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isAdmin(decoded)) {
			//only an admin is allowed to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		UserConfig existingConfig = userConfigService.getById(id);
		if (existingConfig==null || existingConfig.getUser().getId()!=userId) {
			return null;
		}
		
		userConfigService.update(config);
		
		return config;
	}


	@DeleteMapping(value = "/users/{userId}/configs/{configId}/rules/{id}")
	@AuthorizationValidation
	public Map<String, Object> delete(@RequestHeader("Authorization") String token, @PathVariable Long userId, @PathVariable Long id) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isAdmin(decoded)) {
			//only an admin is allowed to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		Map<String, Object> ret = new HashMap<>();

		UserConfig existingConfig = userConfigService.getById(id);
		if (existingConfig==null || existingConfig.getUser().getId()!=userId) {
			ret.put("status", "error");
		} else {
			userConfigService.delete(id);
			ret.put("status", "success");
		}
		
		return ret;
	}



	@Override
	public Logger getLogger() {
		return logger;
	}

}
