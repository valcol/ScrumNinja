module.exports = function() {
   this.When(/^I click on the userstory menu button$/, function () {
    browser.waitForExist('.sidebar-menu > li:nth-child(9) > a:nth-child(1)', 2000);
    browser.click('.sidebar-menu > li:nth-child(9) > a:nth-child(1)');
  });
};
