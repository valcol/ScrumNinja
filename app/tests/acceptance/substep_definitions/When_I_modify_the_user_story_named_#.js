module.exports = function() {
  this.When(/^I modify the user story named "([^"]*)"$/, function (arg) {
    //select the us
    browser.waitForExist('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > button:nth-child(1)');
    browser.click('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(5) > button:nth-child(1)'),

    browser.waitForExist('div.col-md-2:nth-child(2) > input:nth-child(1)', 2000);
    browser.setValue('div.col-md-2:nth-child(2) > input:nth-child(1)','3');

    browser.waitForExist('div.col-md-2:nth-child(3) > input:nth-child(1)', 2000);
    browser.setValue('div.col-md-2:nth-child(3) > input:nth-child(1)','4');

    //color : 605ca8
    browser.click('select.form-control');
    browser.click('select.form-control > option:nth-child(5)');

    browser.waitForExist('.btn-primary', 2000);
    browser.click('.btn-primary');
});
};
