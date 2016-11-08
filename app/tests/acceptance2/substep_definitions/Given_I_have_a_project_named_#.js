module.exports = function() {
  this.Given(/^I have a project named "([^"]*)"$/, function (arg) {
    browser.url('http://localhost:3000/');
    client.pause(1000);
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)', 2000);
    expect(arg).toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content > div > div:nth-child(1) > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(1)'));
});
};
