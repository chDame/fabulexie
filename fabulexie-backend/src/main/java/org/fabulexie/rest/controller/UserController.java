package org.fabulexie.rest.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.lang3.StringUtils;
import org.apache.lucene.analysis.core.WhitespaceAnalyzer;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.rest.auth.AuthorizationValidation;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.rest.service.mail.MailService;
import org.fabulexie.rest.util.PersistenceUtil;
import org.fabulexie.rest.util.SecurityUtils;
import org.fabulexie.service.UserService;
import  org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.interfaces.DecodedJWT;

@RestController
public class UserController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private MailService mailService;

	private AtomicLong count = null;

	@GetMapping(value = "/users")
	@AuthorizationValidation(admin = true)
	public RestfulList<User> list(@RequestHeader("Authorization") String token, @RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "10") int count, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "id") String orderBy, @RequestParam(defaultValue = "ASC") String order) {
		RestfulList<User> result = new RestfulList<>();
		Specification<User> specifUser = userService.getSpecifications(q);
		result.setTotal(getCount(specifUser));
		if(count*(page-1)>result.getTotal()) {
			page = (int) (result.getTotal() / count);
		}
		//userService.list(new QueryParser("id", new WhitespaceAnalyzer()).parse(q), count, page, orderBy, order));
		result.setItems(userService.list(specifUser, count, page, orderBy, order));
		result.setCount(Long.valueOf(result.getItems().size()));
		result.set_links(getLinks(q,count,page,orderBy,order, result.getTotal()));

		return result;
	}

	@PostMapping(value = "/users")
	@AuthorizationValidation(admin = true)
	@ResponseStatus(HttpStatus.CREATED)
	public User create(@RequestHeader("Authorization") String token, @RequestBody User u) {
		u.setPassword(SecurityUtils.generateFriendlyCode());
		userService.create(u);
		if (count!=null) {
			count.incrementAndGet();
		}
		mailService.mailUserCreated(u, u.getPassword(), getServerHost(), Locale.ENGLISH);

		return u;
	}

	@GetMapping(value = "/users/{userId}")
	@AuthorizationValidation
	public User getUser(@RequestHeader("Authorization") String token, @PathVariable Long userId) {

		User user = userService.getById(userId);
		boolean adminAccess = SecurityUtils.isAdmin(token);
		if (adminAccess || user.getTutor()==true) {

			user.setPassword(null);
			if (!adminAccess) {
				user.setCodeForPwdChange(null);
				user.setLocked(null);
				user.setValid(null);
				user.setTutor(null);
				user.setAdmin(null);
			}
			return user;
		}

		throw new UnauthorizedException("Unauthorized access");
	}

	@PatchMapping(value = "/users/{userId}")
	@AuthorizationValidation
	public User patch(@RequestHeader("Authorization") String token, @PathVariable Long userId, @RequestBody User u) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isAdmin(decoded)) {
			//only an admin is allowed to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		User user = userService.getById(userId);
		if (user!=null) {
			if (u.getPassword()!=null) {
				u.setPassword(SecurityUtils.cryptPwd(u.getPassword()));
			}
			u.setId(userId);
			if (u.getAdmin()!=null && u.getAdmin()) {
				u.setTutor(true);
			}
			PersistenceUtil.copyNonNullProperties(u, user);
			userService.update(user);
			user.setPassword(null);
			return user;
		}

		throw new TechnicalException("User is not persisted");
	}

	@PutMapping(value = "/users/{userId}")
	@AuthorizationValidation
	public User update(@RequestHeader("Authorization") String token, @PathVariable Long userId, @RequestBody User u) {
		DecodedJWT decoded = SecurityUtils.decodeToken(token);

		if (userId!=SecurityUtils.getUserId(decoded) && !SecurityUtils.isAdmin(decoded)) {
			//only an admin is allowed to update user not himself
			throw new UnauthorizedException("Action forbidden");
		}
		if (StringUtils.isBlank(u.getPassword())) {
			throw new UnauthorizedException("Clear password is mandatory for full update");
		}
		u.setId(userId);
		u.setPassword(SecurityUtils.cryptPwd(u.getPassword()));
		if (u.getAdmin()!=null && u.getAdmin()) {
			u.setTutor(true);
		}
		User updated = userService.update(u);
	
		u.setPassword(null);
		if (updated!=null) {
			return u;
		}

		throw new TechnicalException("User is not persisted");
	}

	@DeleteMapping(value = "/users/{userId}")
	@AuthorizationValidation(admin = true)
	public Map<String, Object> delete(@RequestHeader("Authorization") String token, @PathVariable Long userId) {
		Map<String, Object> ret = new HashMap<>();
		String status = "error";

		if (userService.delete(userId)) {
			status = "success";
			if (count!=null) {
				count.decrementAndGet();
			}
		}
		ret.put("status", status);
		return ret;
	}


	private long getCount(Specification<User> q) {
		if (q!=null) {
			return userService.count(q);
		}
		if (count==null) {
			count = new AtomicLong(userService.count(null));
		}
		return count.get();
	}

	@Override
	public Logger getLogger() {
		return logger;
	}

}
