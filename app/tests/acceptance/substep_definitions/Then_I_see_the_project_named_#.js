module.exports = function() {
  this.Then(/^I see the project named "([^"]*)"$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)', 2000);
    expect(arg).toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)'));
    client.pause(1000);
  });
};
