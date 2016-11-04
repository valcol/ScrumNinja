module.exports = function() {
  this.When(/^I click on sign up link$/, function () {
    browser.click('.signup');
  });
};
