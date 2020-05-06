package org.fabulexie.rest.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Invitation;
import org.fabulexie.model.User;
import org.fabulexie.rest.auth.AuthUser;
import org.fabulexie.rest.service.mail.MailService;
import org.fabulexie.rest.util.SecurityUtils;
import org.fabulexie.service.AuthenticationService;
import org.fabulexie.service.InvitationService;
import org.fabulexie.service.InitializationService;
import org.fabulexie.service.UserService;
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

@RestController
@RequestMapping("/authentication")
public class AuthenticationController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@Autowired
	private AuthenticationService authenticationService;
	@Autowired
	private UserService userService;
	@Autowired
	private InvitationService invitationService;
	@Autowired
	private InitializationService intializationService;
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
		User user = authenticationService.getByEmailAndPwd(email, password);
		return getAuthUser(user);
	}

	@RequestMapping(value = "/loginWithToken", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser loginWithToken(@RequestHeader("Authorization") String token) throws UnauthorizedException {

		Long userId = SecurityUtils.getUserId(token);
		if (userId==null) {
			throw new UnauthorizedException("Relogin required");
		}
		User user = userService.getById(userId);
		return getAuthUser(user);

	}


	@RequestMapping(value = "/requirePwdChange", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public Map<String, String> requirePwdChange(@RequestParam String email) {
		User user = userService.getUserByEmail(email);
		Map<String, String> ret = new HashMap<>();
		String status = "error";
		if (user != null) {
			String code = authenticationService.generateCodeForPwdChange(email);
			status = "success";

			mailService.mailRequirePwdChange(user, code, getServerHost(), Locale.ENGLISH);
		}

		ret.put("status", status);
		return ret;
	}

	@RequestMapping(value = "/changePwd", method = RequestMethod.POST, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser changePwd(@RequestParam String email, @RequestParam String securityCode,
			@RequestParam String newPassword) {

		boolean pwdChanged = authenticationService.changePwd(email, securityCode, newPassword);
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
		if (intializationService.isEmpty()) {
			//first user is a super admin
			u.setAdmin(true);
			u.setValid(true);
			userService.create(u);
			//schemaCreatorService.setEmpty(false);
			BeanUtils.copyProperties(u, authUser);
			//autologin first time
			authUser.setToken(SecurityUtils.generateToken(u));
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
				invitationService.update(invitation);
				BeanUtils.copyProperties(u, authUser);
				//since it's a valid invitation, the account is valid and we can autologin the user
				authUser.setToken(SecurityUtils.generateToken(u));
				return authUser;
			}
		}

		u.setValid(false);
		u.setAdmin(false);
		userService.create(u);
		String codeValidation = authenticationService.generateCodeForPwdChange(u.getEmail());
		mailService.mailValidRegistration(u, codeValidation, getServerHost(), Locale.ENGLISH);

		BeanUtils.copyProperties(u, authUser);
		return authUser;
	}

	@RequestMapping(value = "/validUser", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public AuthUser validUser(@RequestParam String email, @RequestParam String code) {
		boolean result = authenticationService.validate(email, code);
		if (!result) {
			throw new UnauthorizedException("Account invalid");
		}
		User user = userService.getUserByEmail(email);
		return getAuthUser(user);
	}
	
	private AuthUser getAuthUser(User user) {
		AuthUser authUser = new AuthUser();
		BeanUtils.copyProperties(user, authUser);
		
		authUser.setToken(SecurityUtils.generateToken(user));
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