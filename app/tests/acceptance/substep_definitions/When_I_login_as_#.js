module.exports = function() {
  this.When(/^I login as "([^"]*)"$/, function (arg) {
    client.pause(1000);
    browser.waitForExist('.login-box');
    browser.setValue('input[name="email"]', arg);
    browser.setValue('input[name="password"]', arg);
    browser.click('.login-box .btn');
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content-header > h1', 2000);
    expect('My Projects').toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content-header > h1'));
});
};
