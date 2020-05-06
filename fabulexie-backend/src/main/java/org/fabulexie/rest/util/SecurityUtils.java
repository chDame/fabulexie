package org.fabulexie.rest.util;

import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.UnknownHostException;
//import java.security.InvalidKeyException;
//import java.security.MessageDigest;
//import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;
import java.util.Random;
import java.util.UUID;

import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.model.User;
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

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

public final class SecurityUtils {
	private final static String PREFIX_TOKEN = "Bearer ";
    private final static String SECRET_KEY = UUID.randomUUID().toString();
    private static BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private SecurityUtils() {

    }

    public static String cryptPwd(String clear) throws TechnicalException {
    	return bCryptPasswordEncoder.encode(clear);
    }
    
	public static boolean matches(String pwd, String encodedpassword) {
		return bCryptPasswordEncoder.matches(pwd, encodedpassword);
	}
    
    public static String generateToken(User user) throws TechnicalException {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            LocalDate issuedAt = LocalDate.now();
            LocalDate expires = issuedAt.plusDays(4);
            String token = JWT.create().withJWTId(UUID.randomUUID().toString())// token Id is unique
                    .withIssuer(InetAddress.getLocalHost().getHostName()).withIssuedAt(DateUtils.asDate(issuedAt))
                    .withExpiresAt(DateUtils.asDate(expires)).withClaim("userId", user.getId())
                    .withClaim("username", user.getEmail())
                    .withClaim("admin", user.getAdmin())
                    .withClaim("tutor", user.getTutor())
                    .sign(algorithm);
            return PREFIX_TOKEN+token;
        } catch (
                IllegalArgumentException
                | JWTCreationException
                | UnknownHostException
                | UnsupportedEncodingException e) {
            throw new TechnicalException("Token generation problem", e);
        }
    }

    public static DecodedJWT decodeToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            return JWT.require(algorithm).withIssuer(InetAddress.getLocalHost().getHostName()).build().verify(token.substring(PREFIX_TOKEN.length()));

        } catch (
                IllegalArgumentException
                | UnsupportedEncodingException
                | JWTVerificationException
                | UnknownHostException e) {
           return null;
        }
    }
    
    public static Long getUserId(DecodedJWT decodedToken) {
        return decodedToken.getClaim("userId").asLong();
    }

    public static Boolean isAdmin(String token) {
        DecodedJWT decodedToken = decodeToken(token);
        if (decodedToken==null) {
        	return null;
        }
        return isAdmin(decodedToken);
    }
    
    public static Boolean isAdmin(DecodedJWT decodedToken) {
        return decodedToken.getClaim("admin").asBoolean();
    }
    
    public static Boolean isTutor(String token) {
        DecodedJWT decodedToken = decodeToken(token);
        if (decodedToken==null) {
        	return null;
        }
        return isTutor(decodedToken);
    }
    
    public static Boolean isTutor(DecodedJWT decodedToken) {
        return decodedToken.getClaim("tutor").asBoolean();
    }

    public static Long getUserId(String token) {
        DecodedJWT decodedToken = decodeToken(token);
        if (decodedToken==null) {
        	return null;
        }
        return getUserId(decodedToken);
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
