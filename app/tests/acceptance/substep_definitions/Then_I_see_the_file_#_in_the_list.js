module.exports = function() {
  this.Then(/^I see the file "([^"]*)" in the list$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)', 10000);
    browser.waitForText('#react-root > div > div.content-wrapper > section.content > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)', 5000);
    expect(arg).toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)'));
});
};
