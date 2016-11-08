module.exports = function() {
  // problème : il ne reconnait pas le bouton
  this.When(/^I click to sign out$/, function () {
  	browser.waitForExist(' nav > div > ul > li.dropdown.user.user-menu > a > span');
    browser.click(' nav > div > ul > li.dropdown.user.user-menu > a > span');
    browser.waitForExist('nav > div > ul > li.dropdown.user.user-menu > ul > li.user-footer > div.pull-right > button');
    browser.click('nav > div > ul > li.dropdown.user.user-menu > ul > li.user-footer > div.pull-right > button');
  });
};
