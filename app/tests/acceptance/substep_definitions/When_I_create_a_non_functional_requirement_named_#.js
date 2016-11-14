module.exports = function() {
  this.When(/^I create a non functional requirement named "([^"]*)"$/, function (arg) {
    browser.waitForExist('input.form-control:nth-child(1)', 2000);
    browser.setValue('input.form-control:nth-child(1)', arg);
    //client.pause(1000);
    browser.waitForExist('input.form-control:nth-child(2)', 2000);
    browser.setValue('input.form-control:nth-child(2)', '2');

    browser.waitForExist('button.dropdown-toggle', 2000);
    browser.click('button.dropdown-toggle');
    browser.waitForExist('.dropdown-menu-right > li:nth-child(1) > a:nth-child(1)', 2000);
    browser.click('.dropdown-menu-right > li:nth-child(2) > a:nth-child(1)');

});
};
