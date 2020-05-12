package org.fabulexie.service;

import java.util.List;

import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.persistence.LetterRuleRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LetterRuleService extends AbstractService<LetterRule> {
	
	@Autowired
	private LetterRuleRepository letterRuleRepository;
	
	@Override
	protected LetterRuleRepository getRepository() {
		return letterRuleRepository;
	}
	
	public List<LetterRule> findByConfigId(Long configId) {
		return letterRuleRepository.findByConfig_id(configId);
	}
	

}
