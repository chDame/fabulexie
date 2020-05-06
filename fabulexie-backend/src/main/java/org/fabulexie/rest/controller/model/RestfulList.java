package org.fabulexie.rest.controller.model;

import java.util.Collection;

public class RestfulList<T> {

	private Collection<T> items;
	
	private Long count;
	
	private Long total;
	
	private Links _links;

	public Collection<T> getItems() {
		return items;
	}

	public void setItems(Collection<T> items) {
		this.items = items;
		this.count = Long.valueOf(items.size());
	}

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}

	public Links get_links() {
		return _links;
	}

	public void set_links(Links _links) {
		this._links = _links;
	}
}
