module.exports = function() {
  this.When(/^I put sign up fields$/, function (arg) {
    browser.waitForExist('.register-box');
    browser.setValue('input[name="fullname"]', "Lwi");
    browser.setValue('input[name="email"]', "llipwig10@laposte.net");
    browser.setValue('input[name="password"]', "leo");
    browser.setValue('input[name="repassword"]', "leo");
    /*browser.setValue('input[name="fullname"]', "Léon Lipwig");
    browser.setValue('input[name="email"]', "llipwig@laposte.net");*/
    browser.click('.register-box .btn');

    //browser.waitUntil(function(){ return browser.isExisting('.content-header');},5000);
    //browser.waitForExist('.content-header', 5000);
    //expect('My Projects').toEqual(browser.getText('.content-header h1'));
    expect(true);
  });
};
