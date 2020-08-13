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
package org.fabulexie.service;

import java.util.List;

import org.fabulexie.model.document.Document;
import org.fabulexie.persistence.DocumentRepository;
import org.fabulexie.service.common.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class DocumentService extends AbstractService<Document> {
	
	@Autowired
	private DocumentRepository documentRepository;
	
	@Override
	protected DocumentRepository getRepository() {
		return documentRepository;
	}

	public List<Document> findByParentIdAndSpaceId(Long parentId, Long spaceId) {
		return documentRepository.findByParentIdAndSpaceId(parentId, spaceId);
	}

	public Document findByIdAndSpaceId(Long id, Long spaceId) {
		return documentRepository.findByIdAndSpaceId(id, spaceId);
	}

	public Long deleteBySpaceId(Long spaceId) {
		return documentRepository.deleteBySpaceId(spaceId);
	}
	
	public Long deleteByParentId(Long directoryId) {
		return documentRepository.deleteByParentId(directoryId);
	}
}
