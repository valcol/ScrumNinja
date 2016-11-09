module.exports = function() {
  this.Then(/^I see "([^"]*)"$/, function (arg) {
    browser.waitForExist(arg);
  });
};
