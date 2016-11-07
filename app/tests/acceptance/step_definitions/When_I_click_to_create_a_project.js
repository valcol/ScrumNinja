module.exports = function() {
  this.When(/^I click to create a project$/, function () {
    browser.waitForExist('.main-sidebar');
    browser.click('a[href="/u/newproject"]');
    browser.waitForExist('.content-header');
  });
};