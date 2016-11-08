module.exports = function() {
  this.Then(/^I put the date "([^"]*)" in the "([^"]*)" field$/, function (arg, arg2) {
    browser.waitForExist(arg2, 1000);
    browser.element(arg2).keys(arg);
  });
};
