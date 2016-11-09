module.exports = function() {
  this.Given(/^I am connected as "([^"]*)"$/, function (arg) {
    browser.waitForExist('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu > a > span', 1000);
    browser.waitForText('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu > a > span', 2000);
    expect(arg).toEqual(browser.getText('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu > a > span'));
});
};
