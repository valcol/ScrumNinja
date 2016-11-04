module.exports = function() {
  this.When(/^I put sign in fields$/, function (arg) {
    browser.waitForExist('.login-box');
    browser.setValue('input[name="email"]', "llipwig10@laposte.net");
    browser.setValue('input[name="password"]', "leo");
    //browser.setValue('input[name="email"]', "llipwig@laposte.net");
    browser.click('.login-box .btn'); //only one exist on this page
  });
};
