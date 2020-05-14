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
