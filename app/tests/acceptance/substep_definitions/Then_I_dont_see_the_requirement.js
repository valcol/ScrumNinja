module.exports = function() {
  this.Then(/^I dont see the requirement$/, function () {
    browser.waitForExist('table.table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(2)', 1000, true);
  });
};
