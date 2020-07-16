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
package org.fabulexie.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.persistence.LetterRuleRepository;
import org.fabulexie.persistence.UserConfigRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
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
		return userConfigRepository.findByUserId(userId);
	}

	private UserConfig clean(UserConfig config) {
		Set<Character> used = new HashSet<>();
		used.add(' ');
		List<LetterRule> rules = new ArrayList<>();
		for(int i = config.getLetterRules().size()-1;i>=0;i--) {
			LetterRule rule = config.getLetterRules().get(i);
			rule.getLetters().removeAll(used);
			if (!rule.getLetters().isEmpty()) {
				rules.add(0,rule);
				used.addAll(rule.getLetters());
			} else if (rule.getId()!=null) {
				letterRuleRepository.delete(rule);
			}
		}
		config.setLetterRules(rules);
		return config;
	}
	
	@Override
	public UserConfig create(UserConfig config) {
		config = clean(config);
		userConfigRepository.save(config);
		if (config.getLetterRules()!=null) {
			for(LetterRule rule : config.getLetterRules()) {
				rule.setConfig(config);
				letterRuleRepository.save(rule);
			}
		}
		return config;
	}
	@Override
	public UserConfig update(UserConfig config) {
		config = clean(config);
		userConfigRepository.save(config);
		if (config.getLetterRules()!=null) {
			List<LetterRule> delete = letterRuleRepository.findByConfig_id(config.getId());
			
			for(LetterRule rule : config.getLetterRules()) {
				if (rule.getId()!=null) {
					delete.remove(rule);
				}
				rule.setConfig(config);
				letterRuleRepository.save(rule);
			}
			for(LetterRule rule : delete) {
				letterRuleRepository.deleteById(rule.getId());
			}
		}
		return config;
	}

	public void deleteConfigs(Long userId) {
		List<UserConfig> configs = findByUserId(userId);
		for (UserConfig config : configs) {
			letterRuleRepository.deleteByConfigId(config.getId());
		}
		userConfigRepository.deleteByUserId(userId);
	}
}
