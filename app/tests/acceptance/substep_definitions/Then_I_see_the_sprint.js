module.exports = function() {
  this.Then(/^I see the$/, function () {
    browser.waitForExist('', 2000);
    expect().toEqual(browser.getText(''));
    client.pause(1000);
  });
};
