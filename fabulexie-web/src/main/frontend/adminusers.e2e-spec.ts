import { LoginPage } from './login.po';
import { MainPage } from './main.po';
import { AdminPage } from './admin.po';
import { browser, logging, by, element } from 'protractor';


describe('Fabulexie App, as an admin', () => {
  let loginpage: LoginPage;
  let mainpage: MainPage;
  let adminpage: AdminPage;

  beforeEach(() => {
    loginpage = new LoginPage();
	mainpage = new MainPage();
	adminpage = new AdminPage();
  });

  it('go to the admin user page', () => {
	  browser.ignoreSynchronization = true;

	
		browser.sleep(5000);
		
    loginpage.navigateTo();
	loginpage.doLogin('admin1@.com', 'test');
	
	browser.sleep(1000);
	adminpage.navigateTo();
	browser.sleep(1000);
    expect(adminpage.getPageTitleText()).toEqual('Users list');

	mainpage.logout();
	browser.sleep(500);
	browser.ignoreSynchronization = false;
  });
  

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});