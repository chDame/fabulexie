package org.fabulexie.service;

import org.fabulexie.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InitializationService {
	
	private boolean empty = false;
	
	@Autowired
	private UserRepository userRepository;
	
	public void checkEmpty() {
		empty = userRepository.count()==0;
	}
	
	public boolean isEmpty() {
		return empty;
	}

	public void setEmpty(boolean empty) {
		this.empty = empty;
	}
	
	
}
