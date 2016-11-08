module.exports = function() {
  this.Then(/^I put "([^"]*)" in the "([^"]*)" field$/, function (arg, arg2) {
    browser.waitForExist(arg2, 1000);
    browser.setValue(arg2, arg);
  });
};
