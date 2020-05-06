package org.fabulexie.com.toptal.service.mail;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Locale;
import java.util.concurrent.Future;

import javax.mail.internet.MimeMessage;

import org.fabulexie.model.User;
import org.fabulexie.rest.service.mail.MailService;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@Ignore
@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("junit")
public class MailServiceTest extends AbstractMailServiceTest {

    @Autowired
    private MailService mailService;

    @Test
    public void testMailUserCreated() throws Exception {
        User userCreated = new User("Michel", "Dame", "ch.dame@gmail.com", "pouet");
        Future<Boolean> completed = mailService.mailUserCreated(userCreated, "pwd", "http://localhost:8080", Locale.ENGLISH);

        assertThat(completed.get()).isTrue();
        List<MimeMessage> receivedMessages = getMailsTo("ch.dame@gmail.com");
        assertThat(receivedMessages).hasSize(1);
        assertThat((String) receivedMessages.get(0).getContent()).contains("Hi <span>Michel</span>")
                .contains("Login : <span>ch.dame@gmail.com</span>")
                .contains("Password : <span>pwd</span>");
       
    }

    @Test
    public void testMailRequirePwdChange() throws Exception {
        User user = new User("Michel", "Dame", "toto@toto.to", "pouet");

        Future<Boolean> completed = mailService.mailRequirePwdChange(user, "toto", "http://localhost:8080", Locale.ENGLISH);

        assertThat(completed.get()).isTrue();
        List<MimeMessage> receivedMessages = getMailsTo("toto@toto.to");
        assertThat(receivedMessages).hasSize(1);
        assertThat((String) receivedMessages.get(0).getContent()).contains("Hi <span>Michel</span>")
                .contains("<p style='font-weight:bold;'>toto</p>");
    }

}
