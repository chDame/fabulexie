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
package org.fabulexie.rest.controller;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Invitation;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.security.annotation.IsAdmin;
import org.fabulexie.security.annotation.IsTutorOrAdmin;
import org.fabulexie.service.InvitationService;
import org.fabulexie.service.mail.MailService;
import org.fabulexie.util.PersistenceUtil;
import org.fabulexie.util.SecurityUtils;
import  org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author christophe.dame
 */
@RestController
public class InvitationController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(InvitationController.class);

	@Autowired
	private InvitationService invitationService;
	@Autowired
	private MailService mailService;
	
	private AtomicLong count = null;

	@GetMapping(value = "/invitations")
	@IsTutorOrAdmin
	public RestfulList<Invitation> list(@RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "10") int count, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "id") String orderBy, @RequestParam(defaultValue = "ASC") String order) {
		RestfulList<Invitation> result = new RestfulList<>();
		if (StringUtils.isNotBlank(q)) {
			q = "ownerId: "+SecurityUtils.getConnectedUser().getId()+" AND ("+q+")";
		} else {
			q = "ownerId: "+SecurityUtils.getConnectedUser().getId();
		}
		Specification<Invitation> invitationSpec = invitationService.getSpecifications(q);
		result.setTotal(getCount(invitationSpec));
		if(count*(page-1)>result.getTotal()) {
			page = (int) (result.getTotal() / count);
		}
		result.setItems(invitationService.list(invitationSpec, count, page, orderBy, order));
		result.setCount(Long.valueOf(result.getItems().size()));
		result.add(linkTo(methodOn(InvitationController.class).list(q, count, page, orderBy, order)).withSelfRel());
		if(page*count<result.getTotal()) {
			result.add(linkTo(methodOn(InvitationController.class).list(q, count, page+1, orderBy, order)).withRel("next"));
		}
		if (page>1) {
			result.add(linkTo(methodOn(InvitationController.class).list(q, count, page-1, orderBy, order)).withRel("prev"));
		}
		return result;
	}

	@PostMapping(value = "/invitations")
	@IsTutorOrAdmin
	@ResponseStatus(HttpStatus.CREATED)
	public Invitation create(@RequestBody Invitation invitation) {
		if (!SecurityUtils.isAdmin()) {
			invitation.setAdmin(false);
			invitation.setTutor(false);
		} else if (invitation.getAdmin()!=null && invitation.getAdmin()) {
			invitation.setTutor(true);
		}
		invitation.setOwnerId(SecurityUtils.getConnectedUser().getId());
		Invitation result = invitationService.create(invitation);
		mailService.mailInvitation(result,Locale.ENGLISH);
		if (count!=null) {
			count.incrementAndGet();
		}
		return result;
	}

	@PatchMapping(value = "/invitations/{id}")
	@IsTutorOrAdmin
	public Invitation patch(@PathVariable Long id, @RequestBody Invitation invitation) {

		Invitation existingInvit = invitationService.getById(id);
		if (existingInvit!=null) {
			if (invitation.getEmail()!=null && invitation.getEmail().equals(existingInvit.getEmail())) {
				throw new UnauthorizedException("You can't modify the recipient of an invitation.");
			}
			invitation.setId(id);
			if (invitation.getAdmin()!=null && invitation.getAdmin()) {
				invitation.setTutor(true);
			}
			PersistenceUtil.copyNonNullProperties(invitation, existingInvit);
			invitationService.update(existingInvit);
			
			return existingInvit;
		}

		throw new TechnicalException("Invitation is not persisted");
	}
	
	@PutMapping(value = "/invitations/{id}")
	@IsTutorOrAdmin
	public Invitation update(@PathVariable Long id, @RequestBody Invitation invitation) {
		invitation.setId(id);

		if (invitation.getAdmin()!=null && invitation.getAdmin()) {
			invitation.setTutor(true);
		}
		Invitation updated = invitationService.update(invitation);

		if (updated!=null) {
			return updated;
		}

		throw new TechnicalException("Invitation is not persisted");
	}

	@DeleteMapping(value = "/invitations/{id}")
	@IsAdmin
	public Map<String, Object> delete(@PathVariable Long id) {
		Map<String, Object> ret = new HashMap<>();
		String status = "error";

		if (invitationService.delete(id)) {
			status = "success";
			if (count!=null) {
				count.decrementAndGet();
			}
		}
		ret.put("status", status);
		return ret;
	}

	private long getCount(Specification<Invitation> spec) {
		if (spec != null) {
			return invitationService.count(spec);
		}
		if (count==null) {
			count = new AtomicLong(invitationService.count());
		}
		return count.get();
	}
	
	@Override
	public Logger getLogger() {
		return logger;
	}

}
