package org.fabulexie.persistence;

import java.util.List;

import org.fabulexie.model.UserConfig;
import org.fabulexie.model.rules.LetterRule;
import org.fabulexie.persistence.common.FabulexieRepository;

public interface LetterRuleRepository extends FabulexieRepository<LetterRule> {

	List<LetterRule> findByConfig_id(Long configId);
}
