module.exports = function() {
   this.When(/^I create a task named "([^"]*)"$/, function (arg) {
    browser.waitForExist('div.box-footer > div.row > div > form > div.col-md-10 > input', 2000);
    browser.setValue(' div.box-footer > div.row > div > form > div.col-md-10 > input',arg);

    browser.waitForExist('div.box-footer > div.row > div > form > div.pre-scrollable.us-select-list > table > tbody > tr:nth-child(2) > td:nth-child(3) > input[type="checkbox"]', 2000);
    browser.click('div.box-footer > div.row > div > form > div.pre-scrollable.us-select-list > table > tbody > tr:nth-child(2) > td:nth-child(3) > input[type="checkbox"]');

    browser.waitForExist('div.box-footer > div.row > div > form > div.col-md-2 > button', 2000);
    browser.click('div.box-footer > div.row > div > form > div.col-md-2 > button');
  });
};
