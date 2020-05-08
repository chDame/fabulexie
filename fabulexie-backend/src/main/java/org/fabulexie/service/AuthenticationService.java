package org.fabulexie.service;

import java.util.concurrent.TimeUnit;

import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.persistence.UserRepository;
import org.fabulexie.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

@Service
public class AuthenticationService {
	
	Cache<String, Integer> countLoginFailed = CacheBuilder.newBuilder().expireAfterWrite(2, TimeUnit.HOURS).build();
	
    @Autowired
    private UserRepository userRepository;

    public User getByEmailAndPwd(String email, String pwd) {
        User user = userRepository.findByEmail(email);        
        if (user==null) {
        	throw new UnauthorizedException("User doesn't exist");
        }
		if (!user.getValid()) {
			throw new UnauthorizedException("Account invalid. Please use the link in the confirmation email");
		}
        if (user!=null && user.getPassword() != null) {
        	if (user.getLocked()!=null && user.getLocked()) {
        		throw new UnauthorizedException("Account is locked.");
        	}
        	if (!SecurityUtils.matches(pwd, user.getPassword())) {
        		Integer i = countLoginFailed.getIfPresent(email);
        		if (i==null) {
        			i=0;
        		}
        		if (i==2) {
        			countLoginFailed.invalidate(email);
        			user.setLocked(true);
        			userRepository.save(user);
        			throw new UnauthorizedException("Account is locked.");
        		} else {
        			countLoginFailed.put(email, i+1);
        			throw new UnauthorizedException("Invalid credentials ("+(2-i)+" remaining attemps)");
        		}
        	}

    		countLoginFailed.invalidate(email);
            return user;
        }
        return null;
    }

	public boolean validate(String email, String code) {
		User u = userRepository.findByEmail(email);
		if (u==null || code==null || !code.equals(u.getCodeForPwdChange())) {
			return false;
		}
		u.setValid(true);
		u.setCodeForPwdChange(null);
		userRepository.save(u);
		return true;
	}
	
	public String generateCodeForPwdChange(String email) {
		User u = userRepository.findByEmail(email);
        String resetCode = SecurityUtils.generateFriendlyCode();
        u.setCodeForPwdChange(resetCode);
        
        userRepository.save(u);
        return resetCode;
    }

    public String forcePwdChange(String email) {
		User u = userRepository.findByEmail(email);
        String resetCode = SecurityUtils.generateFriendlyCode();
        u.setCodeForPwdChange(resetCode);
        u.setPassword("");
        userRepository.save(u);
        return resetCode;
    }

    public boolean changePwd(String email, String securityCode, String newPassword) throws TechnicalException {
    	User u = userRepository.findByEmail(email);
        if (securityCode!=null && securityCode.equals(u.getCodeForPwdChange())) {
        	String cryptedPwd = SecurityUtils.cryptPwd(newPassword);
            u.setPassword(cryptedPwd);
            u.setCodeForPwdChange(null);
            u.setValid(true);
            userRepository.save(u);
            return true;
        }
        return false;
    }
}
