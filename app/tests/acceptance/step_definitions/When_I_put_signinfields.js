module.exports = function() {
  this.When(/^I put sign in fields$/, function () {
    browser.waitForExist('.login-box');
    browser.setValue('input[name="email"]', "la@laposte.net");
    browser.setValue('input[name="password"]', "leo");
    browser.click('.login-box .btn');
  });
};
