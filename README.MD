Overview
=====

Fabulexie is a project to allow text adaptations for dylexic readers.

Requirements
============

- Java 8+
- Node.js

Quick Start
===========

In Terminal

`gradlew build`

`java -jar ./fabulexie-web/build/libs/fabulexie-web-0.0.1-SNAPSHOT.jar`

You can study APIs on https://localhost:8443/swagger-ui.html

https://localhost:8443/admin/populate will populate the H2 DB with fake users : user1@fabulexie.fr, admin1@fabulexie.fr. 

Password is `test`

You can then access the web application :
https://localhost:8443/

What is Fabulexie?
===============

The project is divided in sub modules. If you want to use it on your personal computer, you want to run fabulexie-web as described in the previous chapter. 
If you want to develop your own front-end on top of the services, you can run fabulexie-backend. 
You can also play with core module for the parsing engine.

What are some features of Fabulexie?
=================================

- Manage multiple users (you need to configure the SMTP)
- Each users can manager multiple reader profile
- Web pages adaptation
- Adapt Docx documents
- more to come

How can I get started?
======================

1. Clone this repo
2. In a terminal, execute `gradlew build`
3. In a terminal, execute `java -jar ./fabulexie-web/build/libs/fabulexie-web-0.0.1-SNAPSHOT.jar`
4. In a browser, call Then `https://localhost:8443/admin/populate` and keep the list of users passwords displayed.
5. In a browser, go to `https://localhost:8443/` and connect with one or another user

Then you have your local copy of Fabulexie running! More documentation coming soon

Current Status
==============

Fabulexie is a draft receiving frequent updates. The code in the `master` branch is considered the "most stable", but in its current state, Fabulexie isn't ready for actual use.
If there are any bugs, please create issues about them.
