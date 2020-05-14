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
package org.fabulexie.rest.controller.model;

import java.util.Collection;

import org.springframework.hateoas.RepresentationModel;

/**
 * @author christophe.dame
 */
public class RestfulList<T> extends RepresentationModel<RestfulList<T>> {

	private Collection<T> items;
	
	private Long count;
	
	private Long total;
	
	//private Links _links;

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

	//public Links get_links() {
	//	return _links;
	//}

	//public void set_links(Links _links) {
	//	this._links = _links;
	//}
}
