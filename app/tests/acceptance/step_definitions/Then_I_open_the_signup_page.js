module.exports = function() {
  this.Then(/^I open the sign up page$/, function () {
    browser.waitForExist('.register-box');
  });
};