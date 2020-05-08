package org.fabulexie.rest.controller.model;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.fabulexie.model.User;
import org.fabulexie.rest.controller.UserConfigController;
import org.fabulexie.rest.controller.UserController;
import org.springframework.hateoas.RepresentationModel;

public class UserResource extends RepresentationModel<UserResource> {
    private final User user;
    public UserResource(final User user) {
        this.user = user;
        final long id = user.getId();
        add(linkTo(methodOn(UserConfigController.class).all(id)).withRel("userConfigs"));
        add(linkTo(methodOn(UserController.class).get(id)).withSelfRel());
    }
	public User getUser() {
		return user;
	}
    
    
}
