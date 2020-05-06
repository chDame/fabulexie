package org.fabulexie.rest.service.mail;

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

@Service
public class MailService {
    
    @Value("${application.mailer}")
    private String mailer;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private MailContentBuilderService mailContentBuilderService;

    private void sendMail(MimeMessagePreparator messagePreparator, CompletableFuture<Boolean> completableFuture) {
    	mailSender.send(messagePreparator); 
    	completableFuture.complete(true);
    }
    
    public Future<Boolean> mailUserCreated(User user, String pwd, String url, Locale locale) {
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
    
    public Future<Boolean> mailInvitation(Invitation invitation, String url, Locale locale) {
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

    public Future<Boolean> mailRequirePwdChange(User user, String code, String url, Locale locale) {
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

    public Future<Boolean> mailValidRegistration(User user, String code, String url, Locale locale) {
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
