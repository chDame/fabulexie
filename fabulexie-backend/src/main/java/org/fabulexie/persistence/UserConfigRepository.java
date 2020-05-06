package org.fabulexie.persistence;

import java.util.List;

import org.fabulexie.model.UserConfig;
import org.fabulexie.persistence.common.FabulexieRepository;

public interface UserConfigRepository extends FabulexieRepository<UserConfig> {

	List<UserConfig> findByUser_id(Long userId);
}
