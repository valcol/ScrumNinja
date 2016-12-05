module.exports = function() {
  this.When(/^I modify the task named "([^"]*)"$/, function (arg) {
    //select the us
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(5) > button');
    browser.click('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(5) > button'),

    browser.waitForExist('div.box-footer > div.row > div > form > div.col-md-8 > input', 2000);
    browser.setValue(' div.box-footer > div.row > div > form > div.col-md-8 > input',arg+'modif');

    browser.waitForExist('div.box-footer > div.row > div > form > div:nth-child(2) > div:nth-child(2) > button', 2000);
    browser.click('div.box-footer > div.row > div > form > div:nth-child(2) > div:nth-child(2) > button');

});
};
