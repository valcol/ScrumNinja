module.exports = function() {
  this.Then(/^I dont see "([^"]*)"$/, function (arg) {
    browser.waitForExist(arg, true);
  });
};
