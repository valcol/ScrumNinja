module.exports = function() {
  this.Then(/^I see the login screen$/, function () {
    browser.waitForExist('#react-root > div > div > div.login-box-body > p', 2000);
    expect("Sign in to start your session").toEqual(browser.getText('#react-root > div > div > div.login-box-body > p'));
    client.pause(1000);
  });
};
