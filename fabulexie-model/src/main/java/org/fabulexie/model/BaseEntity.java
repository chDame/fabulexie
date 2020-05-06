package org.fabulexie.model;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class BaseEntity<IdType extends Serializable>{

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private IdType id;

	public IdType getId() {
		return id;
	}

	public void setId(IdType id) {
		this.id = id;
	}

}