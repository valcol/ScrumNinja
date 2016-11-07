module.exports = function() {
  this.When(/^I put sign up fields$/, function () {
    browser.waitForExist('.register-box');
    browser.setValue('input[name="fullname"]', "test");
    browser.setValue('input[name="email"]', "test");
    browser.setValue('input[name="password"]', "test");
    browser.setValue('input[name="repassword"]', "test");
    browser.click('.register-box .btn');
  });
};
