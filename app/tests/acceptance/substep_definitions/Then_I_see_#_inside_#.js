module.exports = function() {
  this.Then(/^I see "([^"]*)" inside "([^"]*)"$/, function (arg, arg2) {
    browser.waitForExist(arg2, 2000);
    expect(arg).toEqual(browser.getText(arg2));
    client.pause(3000);
  });
};
