module.exports = function() {
  this.Then(/^I see the "([^"]*)" requirement named "([^"]*)"$/, function (arg1, arg2) {
    browser.waitForExist(arg1 === 'functional'?'table.table:nth-child(2)':'table.table:nth-child(4)', 2000);

    let str = arg1 === 'functional'? 'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)':'table.table:nth-child(4) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)';
    let requirement = browser.getText(str);
    expect(arg2).toEqual(requirement);
    client.pause(1000);
  });
};
