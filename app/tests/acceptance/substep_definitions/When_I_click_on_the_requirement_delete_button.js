module.exports = function() {
   this.When(/^I click on the requirements delete button$/, function () {
    browser.waitForExist('button.pull-right', 2000);
    browser.click('button.pull-right');
  });
};
