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

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Map;

import javax.mail.AuthenticationFailedException;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Config;
import org.fabulexie.model.Invitation;
import org.fabulexie.model.User;
import org.fabulexie.security.AuthUser;
import org.fabulexie.service.ConfigService;
import org.fabulexie.service.InvitationService;
import org.fabulexie.service.UserService;
import org.fabulexie.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

/**
 * @author christophe.dame
 */
@RestController
@RequestMapping("/social")
public class SocialController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(SocialController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private InvitationService invitationService;
	@Autowired
	private ConfigService configService;

	private FacebookConnectionFactory factory =null;
	
	private FacebookConnectionFactory getFactory() {
		if (factory==null || configService.isChanged()) {
			Config conf = configService.get();
			if (conf==null || StringUtils.isAnyBlank(conf.getFaceBookAppId(),
					conf.getFaceBookAppSecret())) {
				throw new TechnicalException("Facebook is not properly configured by administrator");
			}
			factory = new FacebookConnectionFactory(conf.getFaceBookAppId(),
					conf.getFaceBookAppSecret());
			configService.setChanged(false);
		}
		return factory;
	}

	@RequestMapping(value = "/google/{authToken}", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	private AuthUser googleAuthenticate(@PathVariable("authToken") String authCode) throws AuthenticationFailedException {
		if (StringUtils.isBlank(authCode)) {
			throw new AuthenticationFailedException();
		}
		try {
			GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(),
		              JacksonFactory.getDefaultInstance())
				    //.setAudience(Collections.singletonList(PropertiesUtil.getProperty(GOOGLE_CLIENTID)))
				    .build();

				GoogleIdToken idToken = verifier.verify(authCode);
				if (idToken != null) {
					Payload payload = idToken.getPayload();
					String email = payload.getEmail();
					String imgSrc =  (String) payload.get("picture");
					
					User u = userService.getUserByEmail(email);
					if (u==null) {
						String familyName = (String) payload.get("family_name");
						String givenName = (String) payload.get("given_name");
						u = new User();
						u.setEmail(email);
						u.setFirstname(givenName);
						u.setLastname(familyName);
						u.setPassword(SecurityUtils.generateFriendlyCode());
						u.setValid(true);
						u.setPhoto(imgSrc);
						Invitation invitation = invitationService.getByEmail(u.getEmail());
						if (invitation!=null) {
							u.setAdmin(invitation.getAdmin());
							u.setTutor(invitation.getRealtor());
							invitation.setConfirmed(true);
							invitationService.update(invitation);
						}
						userService.create(u);
					} else {
						u.setPhoto(imgSrc);
						userService.update(u);
					}
					
					AuthUser authUser = new AuthUser();
					BeanUtils.copyProperties(u, authUser);
					authUser.setPhoto(imgSrc);
					authUser.setToken(SecurityUtils.getJWTToken(u));
					authUser.setLoginSource("google");
					return authUser;
					
				} else {
					throw new UnauthorizedException("Google Token unrecognized");
				}
		} catch(IOException | GeneralSecurityException e) {
			throw new UnauthorizedException("Google Token unrecognized");
		}

	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/facebook/{authToken}", method = RequestMethod.GET, produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	private AuthUser facebookAuthenticate(@PathVariable("authToken") String authCode) throws AuthenticationFailedException {

		Connection<Facebook> connection =  getFactory().createConnection(new AccessGrant(authCode));
		Facebook facebook = connection.getApi();
		String[] fields = { "id", "email", "first_name", "last_name", "picture" };
		org.springframework.social.facebook.api.User userProfile = facebook.fetchObject("me", org.springframework.social.facebook.api.User.class, fields);
		User u = userService.getUserByEmail(userProfile.getEmail());
		String imgSrc = ((Map<String, Map<String, String>>)userProfile.getExtraData().get("picture")).get("data").get("url");
		if (u==null) {
			u = new User();
			u.setEmail(userProfile.getEmail());
			u.setFirstname(userProfile.getFirstName());
			u.setLastname(userProfile.getLastName());
			u.setPassword(SecurityUtils.generateFriendlyCode());
			u.setValid(true);
			u.setPhoto(imgSrc);
			Invitation invitation = invitationService.getByEmail(u.getEmail());
			if (invitation!=null) {
				u.setAdmin(invitation.getAdmin());
				u.setTutor(invitation.getRealtor());
				invitation.setConfirmed(true);
				invitationService.update(invitation);
			}
			userService.create(u);
		} else {
			u.setPhoto(imgSrc);
			userService.update(u);
		}
		
		AuthUser authUser = new AuthUser();
		BeanUtils.copyProperties(u, authUser);
		authUser.setPhoto(imgSrc);
		authUser.setToken(SecurityUtils.getJWTToken(u));
		authUser.setLoginSource("facebook");
		return authUser;
	}

	@Override
	public Logger getLogger() {
		return logger;
	}
}
