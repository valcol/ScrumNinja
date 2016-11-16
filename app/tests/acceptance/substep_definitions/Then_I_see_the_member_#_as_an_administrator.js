module.exports = function() {
  this.Then(/^I see the member "([^"]*)" as an administrator$/, function (arg) {
    browser.waitForExist('table > tbody > tr:nth-child(3) > td:nth-child(1)', 1000);
    expect(arg).toEqual(browser.getText('table > tbody > tr:nth-child(3) > td:nth-child(1)'));
    browser.waitForExist('table > tbody > tr:nth-child(3) > td:nth-child(2) > select', 2000);
    expect("pa").toEqual(browser.getValue('table > tbody > tr:nth-child(3) > td:nth-child(2) > select'));
});
};
