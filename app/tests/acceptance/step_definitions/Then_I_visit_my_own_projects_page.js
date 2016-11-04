module.exports = function() {
  this.Then(/^I visit my own projects page"$/, function () {
    browser.waitForExist('.breadcrumbs');
    //browser.isExisting('a[href="/u/newproject"]');
  });
};