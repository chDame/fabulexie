package org.fabulexie.service.common;

import java.util.List;
import java.util.Optional;

import org.fabulexie.model.BaseEntity;
import org.fabulexie.persistence.common.FabulexieRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.domain.Specification;

public abstract class AbstractService<T extends BaseEntity<Long>> {

	protected abstract FabulexieRepository<T> getRepository();
	
	private JpaSearchLuceneBuilder<T> jpaSearchLuceneBuilder = new JpaSearchLuceneBuilder<>();
	
	public Specification<T> getSpecifications(String luceneQuery) {
		return jpaSearchLuceneBuilder.getJpaSpecificationFromQuery(luceneQuery);
	}
	
	private Pageable getPageable(int count, int page, String orderBy, String order) {
		return PageRequest.of(page - 1, count, Direction.valueOf(order), orderBy);
	}

	public List<T> list(String query, int count, int page, String orderBy, String order) {
		Pageable pageable = getPageable(page, count, orderBy, order);
		return getRepository().findAll(getSpecifications(query), pageable).getContent();
	}
	
	public List<T> list(Specification<T> query, int count, int page, String orderBy, String order) {
		Pageable pageable = getPageable(page, count, orderBy, order);
		return getRepository().findAll(query, pageable).getContent();
	}

    public T getById(Long id) {
        Optional<T> entity = getRepository().findById(id);
        if (entity.isPresent()) {
        	return entity.get();
        }
        return null;
    }
	
	public T create(T object) {
		return getRepository().save(object);
	}

	public T update(T u) {
		return getRepository().save(u);
	}
	
	public boolean delete(Long id) {
        getRepository().deleteById(id);
        return true;
    }

	public Long count() {
		return count(null);
	}
	
	public Long count(Specification<T> query) {
		if (query==null) {
			return getRepository().count();
		}
		return getRepository().count(query);
	}

	public void deleteAll() {
		getRepository().deleteAll();
	}
	
}
