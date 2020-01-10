import { LoginSignupPage } from './login-signup.po';


describe('protractor Testing - As a customer, I wish to register with the foodexp app for ordering food', () => {
  let loginPage: LoginSignupPage;
  beforeEach(async () => {
    loginPage = new LoginSignupPage();
  });



  it('Login page should have title Login', () => {
    loginPage.load().then(() => {
        loginPage.waitUntilVisible().then(() => {
            loginPage.getTitle().then(title => {
                expect(title).toEqual('Login');
            });
        });
    })
  });

  it('sign in', () => {
    loginPage.checkLoginWithValidUser().then(() => {
        
    });
  });

});
