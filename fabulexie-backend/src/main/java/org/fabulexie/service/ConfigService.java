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

import java.util.List;

import org.fabulexie.model.Config;
import org.fabulexie.persistence.ConfigRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class ConfigService extends AbstractService<Config>{
	
    @Autowired
    private ConfigRepository configMapper;
    
    private boolean changed = true;

    public Config get() {
    	List<Config> confs = this.list("", 1, 1, "id", "ASC");
    	if (confs.size()>0) {
    		return confs.get(0);
    	}
    	return null;
    }

	
    @Override
	public Config update(Config config) {
		changed = true;
		return configMapper.save(config);
	}

	public boolean isChanged() {
		return changed;
	}

	public void setChanged(boolean changed) {
		this.changed = changed;
	}

	@Override
	protected ConfigRepository getRepository() {
		return configMapper;
	}
}
