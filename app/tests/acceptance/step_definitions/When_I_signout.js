module.exports = function() {
  this.When(/^I sign out$/, function (arg) {
  	browser.waitForExist('.dropdown-menu');
    browser.click('.dropdown-menu .pull-right > .btn');
  });
};
