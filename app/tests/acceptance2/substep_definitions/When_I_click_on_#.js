module.exports = function() {
  this.When(/^I click on "([^"]*)"$/, function (arg) {
    browser.waitForExist(arg, 2000);
    browser.click(arg);
  });
};
