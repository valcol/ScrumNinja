module.exports = function() {
  this.Then(/^I see the task named "([^"]*)"$/, function (arg) {
<<<<<<< HEAD
    let path = '';
    switch(arg) {
      case 't1':
        path = 'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)';
        break;
      case 't2':
        path = 'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(3) > td:nth-child(2)';
        break;
      case 't3':
        path = 'table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(2)';
        break;
      default:
        throw 'You tried to use a test to see a task named '+arg+' but it s not allowed to be tested by that one. Improve it or try another test.';
    }
    browser.waitForExist(path, 2000);
    expect(arg).toEqual(browser.getText(path));

=======
    browser.waitForExist('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(2)', 2000);
    expect(arg).toEqual(browser.getText('#react-root > div > div.content-wrapper > section.content > div > div > div.box-body.pad > table > tbody > tr:nth-child(2) > td:nth-child(2)'));
>>>>>>> 84560fcea6dfbafb680e0ce9c1c547083c1085a9
    client.pause(1000);
  });
};
