module.exports = function() {
  this.Then(/^I see the message "([^"]*)" inside "([^"]*)"$/, function (arg, arg2) {
    browser.waitForExist(arg2);
    expect(arg).toEqual(browser.getText(arg2)[1]);
  });
};
