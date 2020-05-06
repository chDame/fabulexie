package org.fabulexie.persistence;

import org.fabulexie.model.Invitation;
import org.fabulexie.persistence.common.FabulexieRepository;

public interface InvitationRepository extends FabulexieRepository<Invitation> {

	Invitation findByEmail(String email);

}