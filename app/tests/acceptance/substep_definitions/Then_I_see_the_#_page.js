module.exports = function() {
  this.Then(/^I see the "([^"]*)" page$/, function (arg) {
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content-header > h1', 2000);
    browser.pause(500);
    expect(arg).toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content-header > h1'));
  });
};
