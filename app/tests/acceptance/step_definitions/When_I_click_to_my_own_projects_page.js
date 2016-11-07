module.exports = function() {
  this.When(/^I click to my own projects page$/, function () {
    browser.waitForExist('.main-sidebar');
    browser.click('a[href="/u/projects"]');
    browser.waitForExist('.content-wrapper');
  });
};