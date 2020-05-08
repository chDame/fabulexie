package org.fabulexie.service;

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.User;
import org.fabulexie.model.UserConfig;
import org.fabulexie.persistence.UserConfigRepository;
import org.fabulexie.persistence.UserRepository;
import org.fabulexie.service.common.AbstractService;
import org.fabulexie.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractService<User> {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserConfigRepository userConfigRepository;
	
	@Override
	protected UserRepository getRepository() {
		return userRepository;
	}
	
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
	
    @Override
	public User create(User user) {
		if (getUserByEmail(user.getEmail())!=null) {
			throw new UnauthorizedException("Account already exists");
		}
		user.setPassword(SecurityUtils.cryptPwd(user.getPassword()));
		if (user.getAdmin()==null) {
			user.setAdmin(false);
		}
		if (user.getValid()==null) {
			user.setValid(false);
		}
		if (user.getTutor()==null) {
			user.setTutor(false);
		}
		user.setLocked(false);
		userRepository.save(user);
		UserConfig config = new UserConfig();
		config.setUser(user);
		config.setName("default");
		userConfigRepository.save(config);
		user.setActiveConfig(config);
		userRepository.save(user);
		return user;
	}

    @Override
	public User update(User u) {
		User duplicate = getUserByEmail(u.getEmail());
		if (duplicate!=null && duplicate.getId()!=u.getId()) {
			throw new UnauthorizedException("Account already exists");
		}
		return userRepository.save(u);
	}
	

}
