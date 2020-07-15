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

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Invitation;
import org.fabulexie.model.User;
import org.fabulexie.security.AuthUser;
import org.fabulexie.security.FabulexiePrincipal;
import org.fabulexie.security.annotation.IsAuthenticated;
import org.fabulexie.service.AuthenticationService;
import org.fabulexie.service.InitializationFacade;
import org.fabulexie.service.InvitationService;
import org.fabulexie.service.SpaceService;
import org.fabulexie.service.UserService;
import org.fabulexie.service.mail.MailService;
import org.fabulexie.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
@RequestMapping("/authentication")
public class AuthenticationController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@Autowired
	private AuthenticationService authenticationService;
	@Autowired
	private UserService userService;
	@Autowired
	private SpaceService spaceService;
	@Autowired
	private InvitationService invitationService;
	@Autowired
	private InitializationFacade intializationService;
	@Autowired
	private MailService mailService;

	@RequestMapping(value = "/initialised", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, Boolean> initialised() {
		Map<String, Boolean> result = new HashMap<>();
		result.put("result", !intializationService.isEmpty());
		return result;
	}
	
	@RequestMapping(value = "/login", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser login(@RequestParam String email, @RequestParam String password) {
		User user = authenticationService.getByEmailAndPwd(email.toLowerCase(), password);
		return getAuthUser(user);
	}

	@RequestMapping(value = "/loginWithToken", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	@IsAuthenticated
	public AuthUser renewToken() throws UnauthorizedException {
		FabulexiePrincipal connected = SecurityUtils.getConnectedUser();

		User user = userService.getById(connected.getId());
		return getAuthUser(user);

	}


	@RequestMapping(value = "/requirePwdChange", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, String> requirePwdChange(@RequestParam String email) {
		User user = userService.getUserByEmail(email.toLowerCase());
		Map<String, String> ret = new HashMap<>();
		String status = "error";
		if (user != null) {
			String code = authenticationService.generateCodeForPwdChange(email);
			status = "success";

			mailService.mailRequirePwdChange(user, code, Locale.ENGLISH);
		}

		ret.put("status", status);
		return ret;
	}

	@RequestMapping(value = "/changePwd", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser changePwd(@RequestParam String email, @RequestParam String securityCode,
			@RequestParam String newPassword) {

		boolean pwdChanged = authenticationService.changePwd(email.toLowerCase(), securityCode, newPassword);
		if (!pwdChanged) {
			throw new UnauthorizedException("Invalid request");
		}

		User user = userService.getUserByEmail(email);
		return getAuthUser(user);
	}

	@RequestMapping(value = "/register", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser register(@RequestBody User u, @RequestHeader(required = false, defaultValue = "") String code) {
		AuthUser authUser = new AuthUser();
		u.setEmail(u.getEmail().toLowerCase());
		if (intializationService.isEmpty()) {
			//create eveyrthing required for the platform to be usable (public space, admin)
			intializationService.initialise(u);
			
			//schemaCreatorService.setEmpty(false);
			BeanUtils.copyProperties(u, authUser);
			//autologin first time
			authUser.setToken(SecurityUtils.getJWTToken(u));
			return authUser;
		} 
		
		if (StringUtils.isNotBlank(code)) {
			Invitation invitation = invitationService.getByEmail(u.getEmail());
			if (invitation!=null && invitation.getCode().equals(code)) {
				u.setAdmin(invitation.getAdmin());
				u.setTutor(invitation.getRealtor());
				u.setValid(true);
				userService.create(u);
				invitation.setConfirmed(true);
				spaceService.grantPublicSpaceAccess(u);
				invitationService.update(invitation);
				BeanUtils.copyProperties(u, authUser);
				//since it's a valid invitation, the account is valid and we can autologin the user
				authUser.setToken(SecurityUtils.getJWTToken(u));
				return authUser;
			}
		}

		u.setValid(false);
		u.setAdmin(false);
		userService.create(u);
		spaceService.grantPublicSpaceAccess(u);
		String codeValidation = authenticationService.generateCodeForPwdChange(u.getEmail());
		mailService.mailValidRegistration(u, codeValidation, Locale.ENGLISH);

		BeanUtils.copyProperties(u, authUser);
		return authUser;
	}

	@RequestMapping(value = "/validUser", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser validUser(@RequestParam String email, @RequestParam String code) {
		boolean result = authenticationService.validate(email.toLowerCase(), code);
		if (!result) {
			throw new UnauthorizedException("Account invalid");
		}
		User user = userService.getUserByEmail(email);
		return getAuthUser(user);
	}
	
	private AuthUser getAuthUser(User user) {
		AuthUser authUser = new AuthUser();
		BeanUtils.copyProperties(user, authUser);
		
		authUser.setToken(SecurityUtils.getJWTToken(user));
		authUser.setLoginSource("standard");
		return authUser;
	}

		
	@PostConstruct
	private void checkEmpty() {
		intializationService.checkEmpty();
	}
	
	@Override
	public Logger getLogger() {
		return logger;
	}

}