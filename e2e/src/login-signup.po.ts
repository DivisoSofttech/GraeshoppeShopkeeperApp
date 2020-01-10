import { browser, ExpectedConditions, by, element } from 'protractor';
import { PageObjectBase } from './page.object.base';

export class LoginSignupPage extends PageObjectBase {

    async registerNewUser() {
        return await this.clickRegisterTab();
       }
      async checkLoginWithNonValidUser() {
         await this.rootPage();
         return await this.clickProfileTab().then(() => {
         this.waitUntilVisible();
         this.enterEMail('test1');
         this.enterPassword('test1test1');
         this.clickSignIn();

         });
       }
       browserReset() {
         return browser.restart();
       }
       constructor() {
         super('app-login-signup', '/login');
       }
       waitForError() {
         browser.wait(
           ExpectedConditions.presenceOf(element(by.css('.error'))),
           3000
         );
       }
       async checkLoginWithValidUser() {
         this.waitUntilVisible();
         this.enterEMail('spiceindia');
         this.enterPassword('spiceindia');
         this.clickSignIn();
       }
       async rootPage() {
         browser.ignoreSynchronization = true;
         return browser.get('/');
       }

      async clickProfileTab() {

       const el = this.getElement('app-root ion-segment');
       const button = el.all(by.tagName('ion-segment-button')).get(2);
       browser.wait(ExpectedConditions.elementToBeClickable(button));
       return await button.click();
       }
       async clickRegisterTab() {

         const el = this.getElement('ion-content ion-segment');
         const button = el.all(by.tagName('ion-segment-button')).get(1);
         browser.wait(ExpectedConditions.elementToBeClickable(button));
         return await button.click();
         }

       getElement(selector) {
         return element(by.css(selector));
       }
       getErrorMessage() {
         return element(by.css('.error')).getText();
       }

       enterEMail(email: string) {
         this.enterInputText(' #username', email);
       }

       enterPassword(password: string) {
         this.enterInputText(' #password', password);
       }
       getPageAddress() {
         return browser.getCurrentUrl();
       }
       clickSignIn() {
         this.clickButton(' #signin');
       }
}
