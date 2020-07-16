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
package org.fabulexie.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.model.User;
import org.fabulexie.security.FabulexiePrincipal;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
/*
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
 */
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.util.Base64Utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * @author christophe.dame
 */
public final class SecurityUtils {
	public final static String PREFIX_TOKEN = "Bearer ";
	public final static String SECRET_KEY = UUID.randomUUID().toString();
	private static BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
	private SecurityUtils() {

	}

	public static String cryptPwd(String clear) throws TechnicalException {
		return bCryptPasswordEncoder.encode(clear);
	}

	public static boolean matches(String pwd, String encodedpassword) {
		return bCryptPasswordEncoder.matches(pwd, encodedpassword);
	}

	public static String getJWTToken(User user) {
		List<String> grantedAuthorities = new ArrayList<String>();
		if (user.getAdmin()) {
			grantedAuthorities.add("ROLE_ADMIN");
		}
		if (user.getTutor()) {
			grantedAuthorities.add("ROLE_TUTOR");
		}
		FabulexiePrincipal principal = new FabulexiePrincipal();
		BeanUtils.copyProperties(user, principal);
		String token = Jwts
				.builder()
				.setId("fabulexieJwt")
				.setSubject(user.getEmail())
				.claim("principal", principal)
				.claim("authorities",grantedAuthorities)
				.setExpiration(new Date(System.currentTimeMillis() + 5*86400000))
				.signWith(SignatureAlgorithm.HS512,
						SECRET_KEY.getBytes()).compact();

		return "Bearer " + token;
	}

	@SuppressWarnings("unchecked")
	public static FabulexiePrincipal getConnectedUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		LinkedHashMap<String, Object> principalUser = (LinkedHashMap<String, Object>)authentication.getPrincipal();
		Integer userId = (Integer) principalUser.get("id");
		String email = (String) principalUser.get("email");
		return new FabulexiePrincipal(userId.longValue(), email);
	}

	
	public static boolean isAdmin() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		for(GrantedAuthority authority : authorities) {
			if (authority.getAuthority().equals("ROLE_ADMIN")) {
				return true;
			}
		}
		return false;
	}
	
	public static String generateFriendlyCode() {
		String[] consonant = { "b", "c", "d", "f", "g", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v" };
		String[] vowels = { "a", "e", "i", "o", "u", "ou", "oi", "ui" };
		StringBuffer code = new StringBuffer();
		Random rand = new Random(System.currentTimeMillis());

		for (int i = 0; i < 4; i++) {
			code.append(consonant[rand.nextInt(14)]);
			code.append(vowels[rand.nextInt(7)]);
		}
		code.append(rand.nextInt(89) + 10);

		return code.toString();
	}
}
