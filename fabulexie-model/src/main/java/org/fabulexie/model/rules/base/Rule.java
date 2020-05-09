package org.fabulexie.model.rules.base;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import org.fabulexie.model.BaseEntity;
import org.fabulexie.model.UserConfig;

import com.fasterxml.jackson.annotation.JsonIgnore;

@MappedSuperclass
public abstract class Rule extends BaseEntity<Long> {
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name="config_id", nullable=false)
    private UserConfig config;

	private String name;
	
	private String color;
	
	private String backgroundColor;
	
	private boolean bold;
	
	private boolean italic;
	
	private boolean underlined;
	
	private boolean upperCase;

	public UserConfig getConfig() {
		return config;
	}

	public void setConfig(UserConfig config) {
		this.config = config;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getBackgroundColor() {
		return backgroundColor;
	}

	public void setBackgroundColor(String backgroundColor) {
		this.backgroundColor = backgroundColor;
	}

	public boolean isBold() {
		return bold;
	}

	public void setBold(boolean bold) {
		this.bold = bold;
	}

	public boolean isItalic() {
		return italic;
	}

	public void setItalic(boolean italic) {
		this.italic = italic;
	}

	public boolean isUnderlined() {
		return underlined;
	}

	public void setUnderlined(boolean underlined) {
		this.underlined = underlined;
	}

	public boolean isUpperCase() {
		return upperCase;
	}

	public void setUpperCase(boolean upperCase) {
		this.upperCase = upperCase;
	}
}
