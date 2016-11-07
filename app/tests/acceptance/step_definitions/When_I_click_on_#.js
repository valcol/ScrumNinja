module.exports = function() {
  this.When(/^I click on "([^"]*)"$/, function (arg) {
    browser.click(arg);
  });
};
