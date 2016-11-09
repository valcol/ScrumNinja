module.exports = function() {
  this.When(/^I register as "([^"]*)"$/, function (arg) {
    browser.waitForExist('.signup', 2000);
    browser.click('.signup');
    browser.waitForExist('.register-box');
    browser.setValue('input[name="fullname"]', arg);
    browser.setValue('input[name="email"]', arg);
    browser.setValue('input[name="password"]', arg);
    browser.setValue('input[name="repassword"]', arg);
    browser.click('.register-box .btn');
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content-header > h1', 2000);
    expect('My Projects').toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content-header > h1'));
});
};
