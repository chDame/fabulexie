package org.fabulexie.service;

import java.util.List;

import org.fabulexie.model.Config;
import org.fabulexie.persistence.ConfigRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
