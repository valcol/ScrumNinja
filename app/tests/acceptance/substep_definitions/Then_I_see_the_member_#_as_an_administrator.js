module.exports = function() {
  this.Then(/^I see the member "([^"]*)" as an administrator$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-body.pad > table > tbody > tr:nth-child(3) > td:nth-child(1)', 1000);
    expect(arg).toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-body.pad > table > tbody > tr:nth-child(3) > td:nth-child(1)'));
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-body.pad > table > tbody > tr:nth-child(3) > td:nth-child(2) > select', 2000);
    expect("pa").toEqual(browser.getValue('#react-root > div > div.content-wrapper > section.content > div > div > div > div.box-body.pad > table > tbody > tr:nth-child(3) > td:nth-child(2) > select'));
});
};
