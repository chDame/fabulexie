package org.fabulexie.rest.service.mail;

import java.util.Locale;

import org.fabulexie.model.Invitation;
import org.fabulexie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class MailContentBuilderService {

    @Autowired
    private TemplateEngine templateEngine;

    public String buildUserInvitation(Invitation invitation, String url, Locale locale) {
        Context context = new Context();
        context.setVariable("username", invitation.getEmail());
        context.setVariable("link", url+"?invitation="+invitation.getEmail()+"&code="+invitation.getCode());
        return templateEngine.process("mailUserInvited-" + locale.getLanguage(), context);
    }

    public String buildUserCreation(User user, String pwd, String url, Locale locale) {
        Context context = new Context();
        context.setVariable("firstname", user.getFirstname());
        context.setVariable("username", user.getEmail());
        context.setVariable("password", pwd);
        context.setVariable("link", url);
        return templateEngine.process("mailUserCreated-" + locale.getLanguage(), context);
    }

    public String buildPwdChange(User user, String code, String url, Locale locale) {
        Context context = new Context();
        context.setVariable("firstname", user.getFirstname());
        context.setVariable("code", code);
        context.setVariable("link", url+"?pwdchange="+user.getEmail()+"&code="+code);
        return templateEngine.process("mailRequirePwdChange-" + locale.getLanguage(), context);
    }

    public String validateRegistration(User user, String code, String url, Locale locale) {
        Context context = new Context();
        context.setVariable("firstname", user.getFirstname());
        context.setVariable("link", url+"?valid="+user.getEmail()+"&code="+code);
        return templateEngine.process("mailValidRegistration-" + locale.getLanguage(), context);
    }

}
