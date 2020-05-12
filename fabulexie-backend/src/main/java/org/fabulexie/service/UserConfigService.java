package org.fabulexie.service;

import java.util.List;

import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.persistence.LetterRuleRepository;
import org.fabulexie.persistence.UserConfigRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserConfigService extends AbstractService<UserConfig> {
	
	@Autowired
	private UserConfigRepository userConfigRepository;
	@Autowired
	private LetterRuleRepository letterRuleRepository;
	
	@Override
	protected UserConfigRepository getRepository() {
		return userConfigRepository;
	}
	
	public List<UserConfig> findByUserId(Long userId) {
		return userConfigRepository.findByUser_id(userId);
	}

	@Override
	public UserConfig create(UserConfig config) {
		userConfigRepository.save(config);
		if (config.getLetterRules()!=null) {
			for(LetterRule rule : config.getLetterRules()) {
				letterRuleRepository.save(rule);
			}
		}
		return config;
	}
	@Override
	public UserConfig update(UserConfig config) {
		userConfigRepository.save(config);
		if (config.getLetterRules()!=null) {
			List<LetterRule> delete = letterRuleRepository.findByConfig_id(config.getId());
			
			for(LetterRule rule : config.getLetterRules()) {
				if (rule.getId()!=null) {
					delete.remove(rule);
				}
				letterRuleRepository.save(rule);
			}
			for(LetterRule rule : delete) {
				letterRuleRepository.deleteById(rule.getId());
			}
		}
		return config;
	}
}
