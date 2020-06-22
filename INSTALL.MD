Overview
=====

NB : on cloud, should open private IPS to communicate on all port/protocol with private IPs

PostgreSQL (on RHEL or OL)
============

#1 - Download postgresql
`sudo yum -y install https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm`

#2 - Install postgresql
`sudo yum -y install postgresql12 postgresql12-server`

`sudo /usr/pgsql-12/bin/postgresql-12-setup initdb`

#3 - Enable and Start postgrsql
`sudo systemctl enable postgresql-12`
`sudo systemctl start postgresql-12`

#4 - Check installation
`sudo systemctl status postgresql-12`

#5 - Change postgresql password
`sudo vi /var/lib/pgsql/12/data/pg_hba.conf`
`# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     trust`
`sudo systemctl restart postgresql-12`
`psql -U postgres`
`ALTER USER postgres with password 'my-password';`
Pour sortir : `\q`

#6 - Restaurer la connexion par password
`sudo vi /var/lib/pgsql/12/data/pg_hba.conf`
`# TYPE  DATABASE        USER            ADDRESS                 METHOD
local   all             all                                     md5`
`sudo systemctl restart postgresql-12`
test : `psql -U postgres`

#7 - Créer la base de données et l'utilisateur applicatif :
`CREATE USER fabuser WITH PASSWORD 'lecturePourTous';`
`CREATE DATABASE fabulexie WITH OWNER fabuser;`
`GRANT ALL PRIVILEGES ON DATABASE fabulexie TO fabuser;`

#8 - Ajouter dans le pg_hba.conf, l'autorisation de se connecter à la base de données depuis l'application
`host    fabulexie       fabuser         10.0.0.3/32             md5`
et redémarrer
`sudo systemctl restart postgresql-12`




Install backend
===========

#1 - install JAVA

`sudo yum update`
`sudo yum install java-1.8.0-openjdk`
`sudo update-alternatives --config java`

`sudo setcap cap_net_bind_service=+epi /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.252.b09-2.el7_8.x86_64/jre/bin/java`
#solve the error while loading shared libraries: libjli.so: cannot open shared object file: No such file or directory
`sudo ln -s /usr/lib/jvm/java-1.8.0-openjdk-1.8.0.252.b09-2.el7_8.x86_64/jre/lib/amd64/jli/libjli.so /usr/lib/`
`sudo ldconfig`

#2 - install Certbots :
`sudo yum install git`
`git clone https://github.com/certbot/certbot`
#check if it's ok (optional)
`sudo yum install nginx certbot python2-certbot-nginx`
`sudo nginx -t`
`sudo systemctl start nginx`
#verifier dans le browser
`sudo systemctl stop nginx`

#3 - open firewall
`sudo firewall-cmd --permanent --zone=public --add-service=http`
`sudo firewall-cmd --permanent --zone=public --add-service=https`
`sudo firewall-cmd --reload`

#4 - generate certificate with certbot
`cd certbot`
`./certbot-auto certonly -a standalone -d back.fabulexie.fr`

#5 - generate the PCS12 from the letsencrypt
`sudo su`
`cd /etc/letsencrypt/live/back.fabulexie.fr`
`openssl pkcs12 -export -in fullchain.pem -inkey privkey.pem -out keystore.p12 -name tomcat -CAfile chain.pem -caname root`
`chmod -R 755 /etc/letsencrypt/live`

#6 - configure the backend
First copy the backend jar somewhere on your server.
You need to create a directory to store the files, for example "fabulexieFiles"
Then, you'll need to write an application.yml file to override default properties (for the key, mailing and storage) :


``` xml
spring:
  datasource:
    url: jdbc:postgresql://10.0.0.2:5432/fabulexie
    driverClassName: org.postgresql.Driver
    username: fabuser
    password: lecturePourTous
  jpa:
  	database-platform: org.hibernate.dialect.PostgreSQLDialect
    show-sql: false
    hibernate:
      ddl-auto: update
# MAIL SPRING CONFIG
  mail:
    default-encoding: UTF-8
    host: XXX
    username: XXX
    password: XXX
    port: 465
    test-connection: true

    properties:
      mail:
        transport:
          protocol: smtp
        smtp:
          auth: true
          starttls:
            enable: true
          socketFactory:
            class: javax.net.ssl.SSLSocketFactory
            fallback: false
server:
  port: 443
  ssl:
    key-store: /etc/letsencrypt/live/back.fabulexie.fr/keystore.p12
    key-store-password: rammstein
    keyStoreType: PKCS12
    keyAlias: tomcat

logging:
  level:
    root: ERROR
    org.docx4j: ERROR
    com.plutext.demo.diagnosticscom.plutext.demo.diagnostics: ERROR

application:
    mailer: devntest@fabulexie.fr
    url: https://webapp.fabulexie.fr/
    storage: ./fabulexieFiles
```


#7 - add postgresql jar
create a libs directory and upload latest postgresql JAR inside

#8 - to launch the backend with the postgresql jar, you'll need to add it to the classpath :
`java -cp fabulexie-backend-0.0.1-SNAPSHOT.jar -Dloader.path='libs' org.springframework.boot.loader.PropertiesLauncher`
