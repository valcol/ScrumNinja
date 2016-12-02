module.exports = function() {
   this.When(/^I click on the sprint menu button$/, function () {
    browser.waitForExist('li.active:nth-child(11) > a:nth-child(1)', 2000);
    browser.click('li.active:nth-child(11) > a:nth-child(1)');
  });
};
