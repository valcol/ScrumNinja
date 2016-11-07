module.exports = function() {
  this.When(/^I put "([^"]*)" in the "([^"]*)" field$/, function (arg, arg2) {
    browser.waitForExist(arg2);
    browser.setValue(arg2, arg);
  });
};
