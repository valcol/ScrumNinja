module.exports = function() {
  this.When(/^I create a project named "([^"]*)"$/, function (arg) {
    browser.waitForExist('#react-root > div > aside.main-sidebar > section > ul > li:nth-child(3) > a > span', 2000);
    browser.click('#react-root > div > aside.main-sidebar > section > ul > li:nth-child(3) > a > span');
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content-header > h1', 2000);
    expect('Create a Project').toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content-header > h1'));
    browser.setValue('form > div > div:nth-child(1) > input', arg);
    client.pause(1000);
    browser.waitForExist('#start', 2000);
    browser.click('#start');
    browser.element('#start').keys('25112015');
    browser.click('#end');
    browser.element('#end').keys('15122015');
    browser.setValue('form > div > div:nth-child(5) > textarea', 'description');
    browser.click('form > div > button');
    browser.waitForExist('form > div > div.callout.callout-success', 2000);
    expect('Project created').toEqual(browser.getText('form > div > div.callout.callout-success'));
    browser.url('http://localhost:3000/');
});
};
