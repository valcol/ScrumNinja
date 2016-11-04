module.exports = function() {
  this.Then(/^I visit the homepage"$/, function () {
    browser.waitForExist('.login-box');
  });
};