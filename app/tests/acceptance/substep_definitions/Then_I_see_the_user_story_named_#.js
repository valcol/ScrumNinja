module.exports = function() {
  this.Then(/^I see the user story named "([^"]*)"$/, function (arg) {
    browser.waitForExist('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)', 2000);
    expect(arg).toEqual(browser.getText('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)'));
    client.pause(1000);
  });
};
