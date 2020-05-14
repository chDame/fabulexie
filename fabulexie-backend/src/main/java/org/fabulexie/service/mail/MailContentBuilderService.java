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

import org.fabulexie.model.Invitation;
import org.fabulexie.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

/**
 * @author christophe.dame
 */
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
