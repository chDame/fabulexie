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

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import org.fabulexie.model.Invitation;
import org.fabulexie.rest.controller.UserController;
import org.springframework.hateoas.RepresentationModel;

/**
 * @author christophe.dame
 */
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
