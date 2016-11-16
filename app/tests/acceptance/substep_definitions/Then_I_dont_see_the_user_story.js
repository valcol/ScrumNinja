module.exports = function() {
  this.Then(/^I dont see the user story$/, function () {
    browser.waitForExist('.table > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)', 1000, true);
  });
};
