import { LoginPage } from './login.po';
import { MainPage } from './main.po';
import { browser, logging } from 'protractor';

describe('Fabulexie App, do login as admin user', () => {
  let loginpage: LoginPage;
  let mainpage: MainPage;

  beforeEach(() => {
    loginpage = new LoginPage();
	mainpage = new MainPage();
  });

  it('should login', () => {
    loginpage.navigateTo();
	loginpage.doLogin('admin1@.com', 'test')
    expect(mainpage.countSidebarMenus()).toEqual(7);
	mainpage.logout();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});