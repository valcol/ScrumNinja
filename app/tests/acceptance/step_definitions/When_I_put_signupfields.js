module.exports = function() {
  this.When(/^I put sign up fields$/, function () {
    browser.waitForExist('.register-box');
    browser.setValue('input[name="fullname"]', "Lwi41");
    browser.setValue('input[name="email"]', "llipwi41g10@laposte.net");
    browser.setValue('input[name="password"]', "leo");
    browser.setValue('input[name="repassword"]', "leo");
    browser.click('.register-box .btn');
  });
};
