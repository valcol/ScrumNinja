module.exports = function() {
  this.Given(/^I am on the login page$/, function () {
    browser.url('http://localhost:3000/r/login');
    client.pause(1000);
    browser.waitForExist('.login-box', 1000);
});
};
