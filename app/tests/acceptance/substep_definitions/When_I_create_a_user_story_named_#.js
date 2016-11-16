module.exports = function() {
   this.When(/^I create a user story named "([^"]*)"$/, function (arg) {
    browser.waitForExist('.col-md-4 > input:nth-child(1)', 2000);
    browser.setValue('.col-md-4 > input:nth-child(1)',arg);

    browser.waitForExist('div.col-md-2:nth-child(2) > input:nth-child(1)', 2000);
    browser.setValue('div.col-md-2:nth-child(2) > input:nth-child(1)','2');

    browser.waitForExist('div.col-md-2:nth-child(3) > input:nth-child(1)', 2000);
    browser.setValue('div.col-md-2:nth-child(3) > input:nth-child(1)','2');

    //color
    browser.click('select.form-control');
    browser.click('select.form-control > option:nth-child(4)');

    browser.waitForExist('.btn-primary', 2000);
    browser.click('.btn-primary');
  });
};
