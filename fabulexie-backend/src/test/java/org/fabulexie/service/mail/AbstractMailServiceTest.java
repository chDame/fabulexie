package org.fabulexie.service.mail;

import java.util.ArrayList;
import java.util.List;

import javax.mail.Address;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.junit.After;
import org.junit.Before;

import com.icegreen.greenmail.store.FolderException;
import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetup;

public abstract class AbstractMailServiceTest {

    private static GreenMail smtpServer;

    @Before
    public void init() {
    	getGreenMailInstance();
    }
    private static GreenMail getGreenMailInstance() {
        if (smtpServer == null) {
            smtpServer = new GreenMail(new ServerSetup(25, null, "smtp"));
            smtpServer.start();
        }
        return smtpServer;
    }

    @After
    public void cleanMsgsAfter() throws FolderException {
        getGreenMailInstance().purgeEmailFromAllMailboxes();
    }

    public List<MimeMessage> getMailsTo(String dest) throws MessagingException {
        List<MimeMessage> result = new ArrayList<>();
        for (MimeMessage msg : getGreenMailInstance().getReceivedMessages()) {
            for (Address recipient : msg.getAllRecipients()) {
                if (dest.equals(recipient.toString())) {
                    result.add(msg);
                    break;
                }
            }
        }
        return result;
    }
}
