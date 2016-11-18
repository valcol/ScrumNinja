module.exports = function() {
  this.Then(/^I see the task named "([^"]*)" modified$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(2)', 2000);
    expect(arg+'modif').toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(2)'));
    client.pause(1000);
  });
};
