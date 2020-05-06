package org.fabulexie.service;

import java.util.List;

import org.fabulexie.model.UserConfig;
import org.fabulexie.persistence.UserConfigRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserConfigService extends AbstractService<UserConfig> {
	
	@Autowired
	private UserConfigRepository userConfigRepository;
	
	@Override
	protected UserConfigRepository getRepository() {
		return userConfigRepository;
	}
	
	public List<UserConfig> findByUserId(Long userId) {
		return userConfigRepository.findByUser_id(userId);
	}
	

}
