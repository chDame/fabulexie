import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-login h1.h4.text-gray-900.mb-4')).getText() as Promise<string>;
  }
}
