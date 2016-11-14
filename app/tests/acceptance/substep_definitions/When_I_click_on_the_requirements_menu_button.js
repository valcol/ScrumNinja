module.exports = function() {
   this.When(/^I click on the requirements menu button$/, function () {
    browser.waitForExist('#react-root > div > aside.main-sidebar > section > ul > li:nth-child(8) > a > span', 2000);
    browser.click('#react-root > div > aside.main-sidebar > section > ul > li:nth-child(8) > a > span');
  });
};
