package org.fabulexie.service;

import java.util.Date;

import org.fabulexie.common.exception.UnauthorizedException;
import org.fabulexie.model.Invitation;
import org.fabulexie.persistence.InvitationRepository;
import org.fabulexie.service.common.AbstractService;
import org.fabulexie.util.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationService extends AbstractService<Invitation> {
	
	@Autowired
	private InvitationRepository invitationMapper;

	@Override
	protected InvitationRepository getRepository() {
		return invitationMapper;
	}
	
    public Invitation getByEmail(String email) {
        return invitationMapper.findByEmail(email);
    }
	
	public Invitation create(Invitation invitation) {
		if (invitationMapper.findByEmail(invitation.getEmail())!=null) {
			throw new UnauthorizedException("Account already exists");
		}
		if (getByEmail(invitation.getEmail())!=null) {
			throw new UnauthorizedException("Invitation already sent");
		}
		invitation.setEmission(new Date());
        invitation.setCode(SecurityUtils.generateFriendlyCode());
		invitationMapper.save(invitation);
		return invitation;
	}
}
