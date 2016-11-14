module.exports = function() {
  this.Then(/^I see the "([^"]*)" requirement named "([^"]*)"$/, function (arg1, arg2) {
    browser.waitForExist(arg1 === 'functional'?'table.table:nth-child(2)':'table.table:nth-child(4)', 2000);

    tmp1 = browser.getText('table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)');
    tmp2 = browser.getText('table.table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1)');
    expect(true).toEqual((arg2 === tmp1) || (arg2 === tmp2));
    client.pause(1000);
  });
};
