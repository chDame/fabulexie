package org.fabulexie.util;

import java.util.ArrayList;
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

public final class SecurityUtils {
	//private final static String PREFIX_TOKEN = "Bearer ";
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
				.setExpiration(new Date(System.currentTimeMillis() + 86400000))
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
