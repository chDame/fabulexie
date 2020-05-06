package org.fabulexie.rest.controller;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import org.apache.commons.lang3.StringUtils;
import org.fabulexie.common.exception.TechnicalException;
import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Invitation;
import org.fabulexie.rest.auth.AuthorizationValidation;
import org.fabulexie.rest.controller.model.RestfulList;
import org.fabulexie.rest.service.mail.MailService;
import org.fabulexie.rest.util.PersistenceUtil;
import org.fabulexie.service.InvitationService;
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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InvitationController extends AbstractController {

	private final Logger logger = LoggerFactory.getLogger(InvitationController.class);

	@Autowired
	private InvitationService invitationService;
	@Autowired
	private MailService mailService;
	
	private AtomicLong count = null;

	@GetMapping(value = "/invitations")
	@AuthorizationValidation(admin = true)
	public RestfulList<Invitation> list(@RequestHeader("Authorization") String token, @RequestParam(defaultValue = "") String q, @RequestParam(defaultValue = "10") int count, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "id") String orderBy, @RequestParam(defaultValue = "ASC") String order) {
		RestfulList<Invitation> result = new RestfulList<>();
		Specification<Invitation> invitationSpec = invitationService.getSpecifications(q);
		result.setTotal(getCount(invitationSpec));
		if(count*(page-1)>result.getTotal()) {
			page = (int) (result.getTotal() / count);
		}
		result.setItems(invitationService.list(invitationSpec, count, page, orderBy, order));
		result.setCount(Long.valueOf(result.getItems().size()));
		result.set_links(getLinks(q,count,page,orderBy,order, result.getTotal()));
		
		return result;
	}

	@PostMapping(value = "/invitations")
	@AuthorizationValidation(admin = true)
	@ResponseStatus(HttpStatus.CREATED)
	public Invitation create(@RequestHeader("Authorization") String token, @RequestBody Invitation invitation) {
		if (invitation.getAdmin()!=null && invitation.getAdmin()) {
			invitation.setRealtor(true);
		}
		Invitation result = invitationService.create(invitation);
		mailService.mailInvitation(result, getServerHost(), Locale.ENGLISH);
		if (count!=null) {
			count.incrementAndGet();
		}
		return result;
	}

	@PatchMapping(value = "/invitations/{id}")
	@AuthorizationValidation(admin = true)
	public Invitation patch(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody Invitation invitation) {

		Invitation existingInvit = invitationService.getById(id);
		if (existingInvit!=null) {
			if (invitation.getEmail()!=null && invitation.getEmail().equals(existingInvit.getEmail())) {
				throw new UnauthorizedException("You can't modify the recipient of an invitation.");
			}
			invitation.setId(id);
			if (invitation.getAdmin()!=null && invitation.getAdmin()) {
				invitation.setRealtor(true);
			}
			PersistenceUtil.copyNonNullProperties(invitation, existingInvit);
			invitationService.update(existingInvit);
			
			return existingInvit;
		}

		throw new TechnicalException("Invitation is not persisted");
	}
	
	@PutMapping(value = "/invitations/{id}")
	@AuthorizationValidation(admin = true)
	public Invitation update(@RequestHeader("Authorization") String token, @PathVariable Long id, @RequestBody Invitation invitation) {
		invitation.setId(id);

		if (invitation.getAdmin()!=null && invitation.getAdmin()) {
			invitation.setRealtor(true);
		}
		Invitation updated = invitationService.update(invitation);

		if (updated!=null) {
			return updated;
		}

		throw new TechnicalException("Invitation is not persisted");
	}

	@DeleteMapping(value = "/invitations/{id}")
	@AuthorizationValidation(admin = true)
	public Map<String, Object> delete(@RequestHeader("Authorization") String token, @PathVariable Long id) {
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
