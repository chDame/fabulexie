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
package org.fabulexie.service.mail;

import java.util.Locale;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;

import org.fabulexie.model.Invitation;
import org.fabulexie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

/**
 * @author christophe.dame
 */
@Service
public class MailService {
    
    @Value("${application.mailer}")
    private String mailer;
    
    @Value("${application.url}")
    private String url;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MailContentBuilderService mailContentBuilderService;

    private void sendMail(MimeMessagePreparator messagePreparator, CompletableFuture<Boolean> completableFuture) {
    	mailSender.send(messagePreparator); 
    	completableFuture.complete(true);
    }
    
    public Future<Boolean> mailUserCreated(User user, String pwd, Locale locale) {
    	CompletableFuture<Boolean> completableFuture = new CompletableFuture<>();
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(mailer);
            messageHelper.setTo(user.getEmail());
            messageHelper.setSubject("A Fabulexie account has been created");
            messageHelper.setText(mailContentBuilderService.buildUserCreation(user, pwd, url, locale), true);
        };

        new Thread(() -> sendMail(messagePreparator, completableFuture)).start();
        return completableFuture;
    }
    
    public Future<Boolean> mailInvitation(Invitation invitation, Locale locale) {
    	CompletableFuture<Boolean> completableFuture = new CompletableFuture<>();
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(mailer);
            messageHelper.setTo(invitation.getEmail());
            messageHelper.setSubject("You're invited to join Fabulexie");
            messageHelper.setText(mailContentBuilderService.buildUserInvitation(invitation, url, locale), true);
        };

        new Thread(() -> sendMail(messagePreparator, completableFuture)).start();
        return completableFuture;
    }

    public Future<Boolean> mailRequirePwdChange(User user, String code, Locale locale) {
    	CompletableFuture<Boolean> completableFuture = new CompletableFuture<>();
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(mailer);
            messageHelper.setTo(user.getEmail());
            messageHelper.setSubject("Fabulexie, change your password");
            messageHelper.setText(mailContentBuilderService.buildPwdChange(user, code, url, locale), true);
        };

        new Thread(() -> sendMail(messagePreparator, completableFuture)).start();
        return completableFuture;
    }

    public Future<Boolean> mailValidRegistration(User user, String code, Locale locale) {
    	CompletableFuture<Boolean> completableFuture = new CompletableFuture<>();
        MimeMessagePreparator messagePreparator = mimeMessage -> {
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage);
            messageHelper.setFrom(mailer);
            messageHelper.setTo(user.getEmail());
            messageHelper.setSubject("Fabulexie, validate your registration");
            messageHelper.setText(mailContentBuilderService.validateRegistration(user, code, url, locale), true);
        };

        new Thread(() -> sendMail(messagePreparator, completableFuture)).start();
        return completableFuture;
    }

}
