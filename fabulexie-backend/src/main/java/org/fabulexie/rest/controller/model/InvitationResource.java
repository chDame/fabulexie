package org.fabulexie.rest.controller.model;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.fabulexie.model.Invitation;
import org.fabulexie.rest.controller.UserController;
import org.springframework.hateoas.RepresentationModel;

public class InvitationResource extends RepresentationModel<InvitationResource> {
    private final Invitation invitation;
    public InvitationResource(final Invitation invitation) {
        this.invitation = invitation;
        final long id = invitation.getId();
        add(linkTo(methodOn(UserController.class).get(id)).withSelfRel());
    }
	public Invitation getInvitation() {
		return invitation;
	}
    
    
}
