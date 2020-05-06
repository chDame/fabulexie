package org.fabulexie.persistence.common;

import org.fabulexie.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface FabulexieRepository<T extends BaseEntity<Long>>  extends JpaRepository<T, Long>, JpaSpecificationExecutor<T> {

	Optional<T> findById(Long id);
	
}
