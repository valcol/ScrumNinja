module.exports = function() {
   this.When(/^I click on the logout button$/, function () {
    browser.waitForExist('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu > a', 2000);
    browser.click('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu > a');
    browser.waitForExist('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu.open > ul > li.user-footer > div.pull-right > button', 2000);
    browser.click('#react-root > div > header > nav > div > ul > li.dropdown.user.user-menu.open > ul > li.user-footer > div.pull-right > button');
  });
};
