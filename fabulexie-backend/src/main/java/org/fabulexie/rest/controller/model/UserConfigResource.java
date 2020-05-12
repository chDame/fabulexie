package org.fabulexie.rest.controller.model;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.fabulexie.model.UserConfig;
import org.fabulexie.rest.controller.UserConfigController;
import org.fabulexie.rest.controller.LetterRuleController;
import org.springframework.hateoas.RepresentationModel;

public class UserConfigResource extends RepresentationModel<UserConfigResource> {
    private final UserConfig userConfig;
    public UserConfigResource(final UserConfig userConfig) {
        this.userConfig = userConfig;
        final long id = userConfig.getId();
        final long userId = userConfig.getUser().getId();
        add(linkTo(methodOn(LetterRuleController.class).all(userId, id)).withRel("letterRules"));
        add(linkTo(methodOn(UserConfigController.class).get(userId, id)).withSelfRel());
    }
	public UserConfig getUserConfig() {
		return this.userConfig;
	}
    
    
}
