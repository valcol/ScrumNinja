module.exports = function() {
  this.Then(/^I see the user story named "([^"]*)" modified$/, function (arg1) {
    browser.waitForExist('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)', 2000);
    //nom, usually unchanged
    expect(arg1).toEqual(browser.getText('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)'));
    //effort
    expect('3').toEqual(browser.getText('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(3)'));
    //priority
    expect('4').toEqual(browser.getText('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(4)'));
    //color : rgba(96,92,168,1) equivalent to #605ca8 or violet
    expect('rgba(96,92,168,1)').toEqual(browser.getCssProperty('.badge','background-color').value);

    client.pause(1000);
  });
};
