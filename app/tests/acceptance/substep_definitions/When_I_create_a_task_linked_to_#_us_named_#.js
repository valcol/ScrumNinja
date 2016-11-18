module.exports = function() {
  this.When(/^I create a task linked to "([^"]*)" us named "([^"]*)"$/, function (arg1, arg2) {

    browser.waitForExist('input.form-control', 2000);
    browser.setValue('input.form-control', arg2);

    browser.waitForExist('table.table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > input:nth-child(1)', 2000);
    browser.waitForExist('table.table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(3) > input:nth-child(1)', 2000);
    switch(arg1) {
        case 'one':
          browser.click('table.table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3) > input:nth-child(1)');
        case 'two':
          browser.click('table.table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(3) > input:nth-child(1)');
            break;
        case 'all':
        default:
          //'all" means no one to us.
    }


    browser.waitForExist('.btn-primary', 2000);
    browser.click('.btn-primary');
});
};
