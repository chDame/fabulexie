package org.fabulexie.persistence;

import org.fabulexie.model.User;
import org.fabulexie.persistence.common.FabulexieRepository;

public interface UserRepository extends FabulexieRepository<User> {

	User findByEmail(String email);

}
