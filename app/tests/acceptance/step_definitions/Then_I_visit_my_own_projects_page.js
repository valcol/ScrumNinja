module.exports = function() {
  this.Then(/^I visit my own projects page"$/, function () {
    browser.waitForExist('.breadcrumbs');
    expect(true).equal(browser.isExisting('a[href="/u/newproject"]'));
  });
};